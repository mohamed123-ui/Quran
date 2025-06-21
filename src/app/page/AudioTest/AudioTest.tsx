"use client";
import React, { useEffect, useState } from "react";

interface Surah {
  number: number;
  name: string;
}

const SpeechPage = () => {
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [surahNumber, setSurahNumber] = useState(1);
  const [ayah, setAyah] = useState("");
  const [showAyah, setShowAyah] = useState(true);
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        if (data?.data) {
          setSurahList(
            data.data.map((s: Surah) => ({
              number: s.number,
              name: s.name,
            }))
          );
        }
      } catch (err) {
        console.error("فشل تحميل السور", err);
      }
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    const fetchAyah = async () => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const data = await res.json();
        if (data?.data?.ayahs?.length > 0) {
          setAyah(data.data.ayahs[0].text);
          resetState();
        }
      } catch (err) {
        console.error("فشل تحميل الآية", err);
      }
    };
    fetchAyah();
  }, [surahNumber]);

  useEffect(() => {
    if (!showAyah) return;
    const timer = setTimeout(() => {
      setShowAyah(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [ayah, showAyah]);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-EG";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setRecognizedText(result);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  const resetState = () => {
    setRecognizedText("");
    setShowAyah(true);
    setIsRecording(false);
  };

  const cleanText = (text: string) =>
    text
      .replace(/[ًٌٍَُِّْـ]/g, "")
      .replace(/آ|أ|إ/g, "ا")
      .replace(/\s+/g, " ")
      .trim();

  const isMatch = cleanText(recognizedText) === cleanText(ayah);

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6">اختبار الإملاء الصوتي</h1>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          اختر السورة:
        </label>
        <select
          value={surahNumber}
          onChange={(e) => setSurahNumber(Number(e.target.value))}
          className="p-2 rounded-lg border border-gray-300 w-full"
        >
          {surahList.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.name}
            </option>
          ))}
        </select>
        <div className="mt-2 text-sm text-gray-500">
          <strong>السورة المختارة:</strong>{" "}
          {surahList.find((s) => s.number === surahNumber)?.name}
        </div>
      </div>

      {showAyah ? (
        <p className="text-2xl font-[Amiri] text-black border rounded-lg py-4 px-2 bg-[#f0fdf4]">
          {ayah}
        </p>
      ) : (
        <p className="text-xl text-gray-400 mt-4">❓ حاول تفتكر الآية وقلها</p>
      )}

      {!isRecording && !recognizedText && (
        <button
          onClick={startSpeechRecognition}
          className="bg-green-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-700"
        >
          ابدأ التسجيل
        </button>
      )}

      {recognizedText && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">النص اللي قلته:</h2>
          <p className="text-lg text-gray-700">{recognizedText}</p>

          <h2 className="text-xl font-bold mt-4 mb-2">النتيجة:</h2>
          <p className={`text-lg ${isMatch ? "text-green-600" : "text-red-600"}`}>
            {isMatch ? "صحيح!" : "غير مطابق"}
          </p>

          <button
            onClick={resetState}
            className="mt-4 bg-gray-200 text-black px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeechPage;
