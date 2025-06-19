"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/Store";
import {
  setAyah,
  setHiddenIndices,
  setUserAnswer,
  checkAnswers,
  resetTest,
} from "@/app/Redux/hiddenSlice";
import { Attempt, getAttempts, saveAttempt } from "@/app/utils/localStorage";
export default function ManualTest() {
    const [score, setScore] = useState<null | { correct: number; total: number }>(null);
  const { originalAyah, hiddenIndices, userAnswers, correctAnswers } =
    useSelector((state: RootState) => state.manualTest);
  const [surahs, setSurahs] = useState<{ number: number; name: string }[]>([]);
  const [surahNumber, setSurahNumber] = useState<number>(1);
  const [ayahNumber, setAyahNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [attemptsHistory, setAttemptsHistory] = useState<Attempt[]>([]);

useEffect(() => {
  setAttemptsHistory(getAttempts());
}, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const json = await res.json();
        setSurahs(
          json.data.map((s: any) => ({ number: s.number, name: s.name }))
        );
      } catch (e) {
        console.error("خطأ في جلب السور", e);
      }
    })();
  }, []);
const removeTashkeel = (text: string) => {
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g, "");
};

const fetchAyah = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/ar`
    );
    const data = await res.json();

    dispatch(resetTest());
    const cleanedText = removeTashkeel(data.data.text);
    dispatch(setAyah(cleanedText));

    const words = cleanedText.split(" ");
    const hiddenCount = Math.min(2, words.length > 2 ? 2 : 1);
    const randomIndices: number[] = [];
    while (randomIndices.length < hiddenCount) {
      const rand = Math.floor(Math.random() * words.length);
      if (!randomIndices.includes(rand)) randomIndices.push(rand);
    }
    dispatch(setHiddenIndices(randomIndices));
  } catch (e) {
    console.error("خطأ في جلب الآية", e);
  }
  setLoading(false);
};

  const handleChange = (index: number, value: string) => {
    dispatch(setUserAnswer({ index, answer: value.trim() }));
  };

  const renderAyah = () => {
    const words = originalAyah.split(" ");
    return words.map((word, idx) =>
      hiddenIndices.includes(idx) ? (
        <input
          key={idx}
          className={`border px-2 py-1 mx-1 w-28 text-center rounded ${
            correctAnswers[idx] === undefined
              ? "border-gray-400"
              : correctAnswers[idx]
              ? "border-green-500 bg-green-100"
              : "border-red-500 bg-red-100"
          }`}
          value={userAnswers[idx] || ""}
          onChange={(e) => handleChange(idx, e.target.value)}
        />
      ) : (
        <span key={idx} className="mx-1 text-lg">
          {word}
        </span>
      )
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">📝 اختبار إخفاء الكلمات</h1>

      <div className="flex gap-4 items-center">
        <select
          className="p-2 border rounded flex-1"
          value={surahNumber}
          onChange={(e) => setSurahNumber(Number(e.target.value))}
        >
          {surahs.map((s) => (
            <option key={s.number} value={s.number}>
              {`سورة ${s.name} (${s.number})`}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="p-2 border rounded w-24"
          value={ayahNumber}
          min={1}
          onChange={(e) => setAyahNumber(Number(e.target.value))}
        />
        <button
          onClick={fetchAyah}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "جاري..." : "جلب الآية"}
        </button>
      </div>

      {originalAyah && (
        <>
          <div className="bg-gray-100 p-4 rounded text-right leading-loose flex flex-wrap">
            {renderAyah()}
          </div>
      <button
  onClick={() => {
    dispatch(checkAnswers());
    const correctCount = Object.values(correctAnswers).filter(Boolean).length;
    const wrongCount = Object.values(correctAnswers).filter(val => val === false).length;
    const originalSurahName = surahs.find(s => s.number === surahNumber)?.name || "غير معروف";
    saveAttempt({
      surah: originalSurahName, // خزّن الاسم عند جلب السورة
      surahNumber,
      ayahNumber,
      correctCount,
      wrongCount,
      date: new Date().toISOString(),
    });
    const total = hiddenIndices.length;
    let correct = 0;

    hiddenIndices.forEach((index) => {
      if (correctAnswers[index]) correct++;
    });
    setScore({ correct, total });
  }}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
>
   تحقق من الإجابات
</button>
{score && (
  <div className="mt-4 text-lg font-semibold text-center">
     إجابات صحيحة: {score.correct} من {score.total} (
    {Math.round((score.correct / score.total) * 100)}%)
  </div>
)}
          <button
            onClick={() => dispatch(resetTest())}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
          >
             إعادة المحاولة
          </button>
          {attemptsHistory.length >= 0 && (
  <div className="mt-6 bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2"> المحاولات السابقة</h2>
    <ul className="space-y-2 max-h-60 overflow-auto">
      {attemptsHistory.map((att, idx) => (
        <li key={idx} className="border-b pb-2">
          <strong>سورة:</strong> {att.surah} ({att.surahNumber}) — آية {att.ayahNumber}<br />
          <strong>✅ صحيح:</strong> {att.correctCount} | ❌ خطأ: {att.wrongCount}<br />
          <span className="text-gray-600 text-sm">{new Date(att.date).toLocaleString("ar-EG")}</span>
        </li>
      ))}
    </ul>
    
<div>
  <button  
  onClick={()=>{
    localStorage.removeItem("attempts");
    setAttemptsHistory([]);
  }}
  className="text-red-500 hover:text-red-700 mt-4 px-4 py-2 rounded border border-red-500 hover:bg-red-100
  
  ">حذف</button>
</div>
  </div>
)}

        </>


        
      )}
    </div>
  );
}
