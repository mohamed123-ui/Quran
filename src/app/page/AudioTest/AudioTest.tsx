"use client";
import React, { useEffect, useState } from "react";

const SpeechPage = () => {
  const [surahList, setSurahList] = useState<{ number: number; name: string }[]>([]);
  const [surahNumber, setSurahNumber] = useState(1);
  const [ayah, setAyah] = useState("");
  const [showAyah, setShowAyah] = useState(true);
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // جلب أسماء السور
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await res.json();
        if (data?.data) {
          setSurahList(data.data.map((s: any) => ({
            number: s.number,
            name: s.name,
          })));
        }
      } catch (err) {
        console.error("فشل تحميل السور", err);
      }
    };
    fetchSurahs();
  }, []);

  // جلب آية من السورة المختارة
  useEffect(() => {
    const fetchAyah = async () => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const data = await res.json();
        if (data?.data?.ayahs?.length > 0) {
          setAyah(data.data.ayahs[0].text);
          resetState(); // عند تغيير السورة نعيد الحالة
        }
      } catch (err) {
        console.error("فشل تحميل الآية", err);
      }
    };
    fetchAyah();
  }, [surahNumber]);

  // إخفاء الآية بعد 5 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAyah(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [ayah]);

  // التسجيل الصوتي
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
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

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setRecognizedText(result);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  // إعادة المحاولة
  const resetState = () => {
    setRecognizedText("");
    setShowAyah(true);
    setIsRecording(false);
  };
const normalize = (text: string) =>
  text
    .replace(/\s+/g, " ")            // توحيد المسافات
    .trim();



const isMatch = normalize(recognizedText) === normalize(ayah);
  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6"> اختبار الإملاء الصوتي</h1>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mt-2">نص الآية بعد التطبيع: {normalize(ayah)}</p>
<p className="text-sm text-gray-400">نصك بعد التطبيع: {normalize(recognizedText)}</p>
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
      </div>

      {showAyah ? (
        <p className="text-2xl font-[Amiri] text-black border rounded-lg py-4 px-2 bg-[#f0fdf4]">
          {ayah}
        </p>
        
      ) : (
        <p className="text-xl text-gray-400 mt-4">❓ حاول تفتكر الآية وقلها</p>
        
      )}

      {/* زر التسجيل */}
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
          <h2 className="text-xl font-bold mb-2"> النص اللي قلته:</h2>
          <p className="text-lg text-gray-700">{recognizedText}</p>

          <h2 className="text-xl font-bold mt-4 mb-2"> النتيجة:</h2>
       
<p className={`text-lg ${isMatch ? "text-green-600" : "text-red-600"}`}>
  {isMatch ? " صحيح!" : " غير مطابق"}
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
