"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/Store";
import { surahAudio, surahDetails } from "@/app/Redux/detailsSlic";
import { useParams } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import meshary from "../../../../public/images.webp"
import abdlebased from "../../../../public/artworks-ZrSEx5xjX05iNmcq-5eGMEQ-t1080x1080.jpg"
import ali from "../../../../public/1786638.jpeg"
import { motion} from "framer-motion";
import { getHeardSurahs, saveHeardSurah } from "@/app/utils/localStorage";

export default function SurahDetailsPage() {
const {id}=useParams<{id:string}>()
  const dispatch = useDispatch<AppDispatch>();
  const { currentSurah, loading, error ,selectQari,qari } = useSelector(
    (state: RootState) => state.details
  );
const [selectedQari, setSelectedQari] = useState<string>(selectQari.identifier)//مشاري
  useEffect(() => {
 if (id) {
      dispatch(surahDetails(Number(id))).then(() => {
        dispatch(surahAudio({ identifier: selectedQari, surahNumber: Number(id) }));
      });
    }
  }, [id, dispatch]);
useEffect(() => {
  if (
    
currentSurah &&
    currentSurah.name &&
    currentSurah.number !== undefined

  ) {
    const heard = getHeardSurahs();
    const alreadySaved = heard.find(s => s.surahNumber === currentSurah.number);
    if (!alreadySaved) {
      saveHeardSurah({
        name: currentSurah.name,
        surahNumber: currentSurah.number,
        date: new Date().toISOString(),
      });
    }
  }
}, [currentSurah]);

  const selectChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedQari(e.target.value);  const newQari = e.target.value;
    setSelectedQari(newQari);
    if (id) {
      dispatch(surahAudio({ identifier: newQari, surahNumber: Number(id) }));
    }
  }

  if (loading === "pending")
    return <p className="text-center"
    >
     <ScaleLoader
            color='green'
          />   
        جاري التحميل...</p>;
  if (error) return <p className="text-center text-red-700">{error}</p>;
  if (!currentSurah) return null;

  return (
    <motion.div
       initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
    className="p-4 container">

      <h1 className="text-2xl font-bold text-center">
        {currentSurah.name} - {currentSurah.englishName}
      </h1>
      <p className="text-center text-gray-600">
        عدد الآيات: {currentSurah.numberOfAyahs}  . <span>{currentSurah.revelationType}</span>
      </p>

      <div className="text-center border w-fit rounded-2xl px-2.5 m-auto my-7">
           <select className="bg-white"  value={selectedQari} onChange={selectChange}>
 {qari.map((q) => (
            <option key={q.identifier} value={q.identifier}>
              {q.name}
            </option>
          ))}
        </select>
        
 </div>
 <div>
    
<motion.div
  initial={{opacity: 0, y: 50}}
  animate={{ opacity: 1, y: 0 }}
  transition={{  duration: .6, repeat: 2, repeatType: "reverse" }}
  className="flex gap-5 justify-center my-6"
>
  <Image
    className="rounded-2xl"
    src={meshary}
    height={70}
    width={70}
    alt="مشاري العفاسي"
  />
  <Image
    className="rounded-2xl"
    src={abdlebased}
    height={70}
    width={70}
    alt="عبد الباسط"
  />
  <Image
    className="rounded-2xl"
    src={ali}
    height={70}
    width={70}
    alt="علي الحذيفي"
  />
</motion.div>
 </div>
<div>
  {currentSurah.fullAudio && (
          <div className="my-6 flex justify-center bg-[#F6F9FB] py-10 rounded-3xl px-6">
            <audio controls className="w-full md:w-2/3 bg-white rounded-lg shadow-md">
              <source src={currentSurah.fullAudio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>


<div className="text-3xl font-bold text-center py-7 text-[#51ba7f]">
    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
</div>
   <div className="mt-4 flex flex-wrap w-full ">
  {currentSurah.ayahs.map((ayahs) => (
    <div key={ayahs.number} className="bg-white p-1 w-fit  rounded-md  ">
      <span className="block text-right w-full text-2xl font-[Amiri] leading-loose">
        {ayahs.text}
        <span className="bg-[#F3FAF6] p-2 rounded-4xl text-sm">        {ayahs.numberInSurah}
</span>
      </span>
        
 
    </div>
  ))}
</div>
<div className="flex my-7 justify-between">
    {currentSurah.number>=0&&
      <Link 
      href= {`/surahDetails/${currentSurah.number-1}`}>
        <p>
<button
disabled={currentSurah.number-1<=0} 
className="border p-1 hover:text-[#51ba7f] disabled:cursor-no-drop cursor-pointer">السوره السابقه</button>
        </p>
    </Link>
    }
 
    <Link href={`/surahDetails/${currentSurah.number+1}`}>
<button
disabled={currentSurah.number+1>=114}
className="border p-1 hover:text-[#51ba7f] disabled:cursor-no-drop cursor-pointer">السوره التاليه</button>
    </Link>
</div>
</motion.div>


);
}
