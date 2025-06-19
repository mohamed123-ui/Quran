"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "../../../public/iqraa.png";
import SurahListPage from "../page/surah/SurahList";
import JuzsList from "../page/Juz/JuzsList";
import RevelationOrder from "../page/RevelationOrder/RevelationOrder";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { getHeardSurahs, HeardSurah, saveHeardSurah } from "../utils/localStorage";
import { motion } from "framer-motion";
export default function LastRead() {
  const [Active, setActive] = useState("none")
  const [ShowSurah, setShowSurah] = useState(true);
  const [heardSurah, setHeardSurah] = useState<HeardSurah[]>([]);
  useEffect(() => {
    setHeardSurah(getHeardSurahs());
  }, [])

  const handelSurahClick = () => {
    event?.preventDefault();
    setShowSurah(true);
    setShowJuzs(false);
    SetRevelationOrder(false);
    setActive("surah");
  };
  const [ShowJuzs, setShowJuzs] = useState(false)
  const handelClickJuzs = () => {
    event?.preventDefault();
    setShowJuzs(true);
    setShowSurah(false);
    SetRevelationOrder(false);
    setActive("juz");
    
  }
  const[ShowRevelationOrder,SetRevelationOrder]=useState(false)
  const handelClickRevelationOrder = () => {
    event?.preventDefault();
    SetRevelationOrder(true);
    setShowSurah(false);
    setShowJuzs(false);
    setActive("revelation");
  };
  return (
    <motion.div
    
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex  flex-col items-center justify-items-center justify-center">
           <div className="relative lg:left-[-30%] mt-4 ">
        <Link href={"/test"} className="underline flex items-center gap-0.5 text-xl hover:cursor-pointer hover:text-green-400"> <span><FaLongArrowAltRight></FaLongArrowAltRight></span> اختبار حفظ القرءان الكريم 
</Link>
      </div>
      <div className="my-24">
        <Image src={image} width={500} height={200} alt="image" />
      </div>
     
      <div className="w-full lg:w-[20%] my-10 ">
        <div className="text-center">
          <h1 className="text-[#18A34B]  text-5xl pb-2 font-bold  ">
            القرآن الكريم
          </h1>
          <p className="text-[#64748B] text-xl">
            تصفح واستمع إلى آيات الذكر الحكيم.
          </p>
<div className="bg-[#F3FAF6] relative m-2 lg:left-[200%] lg:w-full text-green-400 text-3xl p-4 w-full rounded-lg mt-4">
  <p
    onClick={() => {
      saveHeardSurah({
        name:"الفاتحه",
        surahNumber: 1,
        date: new Date().toISOString(),
      });
      setHeardSurah(getHeardSurahs());
    }}
    className="cursor-pointer"
  >
   آخر ما قرأت
  </p>

  {heardSurah.length > 0 ? (
    <div className="flex flex-col items-center">
      {heardSurah.map((surah, index) => (
        <div key={index} className="flex items-center gap-2 my-2">
          <span className="text-lg">{`سورة ${surah.name} (${surah.surahNumber})`}</span>
          <span className="text-sm text-gray-500">
            {new Date(surah.date).toLocaleDateString("ar-EG")}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-base mt-2">لا توجد قراءات سابقة.</p>
  )}
</div>

     
        </div>
      </div>
      <div>
        <ul className="flex gap-7 text-xl border-2 py-2 px-10 rounded-2xl border-[#18A34B]">
          <li>
            <a

              onClick={handelSurahClick}
className={`py-1 px-3 text-xl cursor-pointer ${
                Active === 'surah' ? 'text-[#18A34B] ' : ''
              }`}
            >
              سوره
            </a>
          </li>
          <li>
            <a onClick={handelClickJuzs} className={`text-xl cursor-pointer ${Active=="juz"?
                'text-[#18A34B] ' : 'text-black'
            }`} href="">جزء</a>
          </li>
          <li>
            <a onClick={handelClickRevelationOrder}  
            className={`text-xl cursor-pointer ${Active=="revelation"?
                'text-[#18A34B] ' : 'text-black'
            }`}
            href="">ترتيب نزول الوحي</a>
          </li>
        </ul>
      </div>
      {ShowRevelationOrder && <RevelationOrder />}
      {ShowJuzs && <JuzsList />}
      {ShowSurah && <SurahListPage />}
    </motion.div>
  );
}
