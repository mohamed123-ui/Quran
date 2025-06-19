import { getAllJuzs, JuzData } from '@/app/Redux/JuzhSlice'
import { AppDispatch } from '@/app/Redux/Store'
import { RootState } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoBook } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'

export default function JuzsList() {
    const dispatch= useDispatch<AppDispatch>()
   const {juzs,loading,error}= useSelector((state:RootState)=>state.juzs)
   useEffect(() => {
    if(loading=="idl"||error=="faild"||juzs.length==0){

   dispatch(getAllJuzs("quran-uthmani"))
    }
   }, [dispatch,loading,juzs.length])
   if (loading === 'pending' || loading === 'idle') {
    return (
      <div className='text-center text-xl my-8'>
        <p>
            جاري تحميل الاجزاء 
            <ScaleLoader 
            color='green'
            />
            </p>
      </div>
    );
}

  return (
    <div className='my-8 p-5'>
      <h1 className='text-center text-3xl font-bold mb-6 text-[#18A34B]'>أجزاء القرآن الكريم</h1>
      <div className="flex justify-between items-center gap-1 flex-wrap">
        {juzs.map((juz: JuzData) => (
          <div
            key={juz.number}
            className='border border-[#18A34B] w-full lg:w-[23%] p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'
          >
            <div className='flex justify-between items-center cursor-pointer'>
                <h2 className='text-2xl font-semibold mb-2 text-[#18A34B]'>الجزء رقم: {juz.number}</h2>
            <span className="font-medium flex items-center gap-1.5">

                {juz.ayahs.length} آية
                
                <span className='text-xl font-[Amiri] text-[#18A44B]'><IoBook />
                </span>
                </span>
            </div>

            {Object.values(juz.surahs).length > 0 && (
              <p className="text-gray-700 text-md mt-2">
                <span className="font-medium">السور في هذا الجزء: 
                    <br />
                    
                    </span> {Object.values(juz.surahs).map((surah) => (
                  <span key={surah.number} className="ml-1 font-medium flex gap-2">
                                             ({surah.number})
                    <Link href={`/surahDetails/${surah.number}`} >
                    {surah.name}

                    </Link>
                  </span>
                ))}
                تبدأ بسورة: <span className="font-medium">{Object.values(juz.surahs)[0].name}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
