"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/Redux/Store';
import { getSurah } from '../../Redux/Slice';
import { IoBook } from 'react-icons/io5';
import { ScaleLoader } from 'react-spinners';
import { motion } from 'framer-motion'; 
import Link from 'next/link';
export default function SurahListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { surahs, loading, error } = useSelector((state: RootState) => state.tabs);
const [search, setSearch] =useState <string>("")
  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getSurah());
    }
  }, [dispatch, loading]);
function filterSurahs() 
{
  if(!search)return surahs;
  return surahs.filter(surah => 
    surah.name.toLowerCase().includes(search.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(search.toLowerCase())
  );
}
  if (loading === 'pending' || loading === 'idle') {
    return (
      <div className='text-center text-xl my-8'>
        <p>
          جاري تحميل السور
          <ScaleLoader
            color='green'
          />
        </p>
      </div>
    );
  }
if(error){
  return <p>{error}</p>
}
  if (loading === 'failed') {
    return (
      <div className='text-center text-xl my-8 text-red-600'>
        <p>حدث خطأ أثناءيل السور: {error || 'خطأ غير معروف'}</p>
      </div>
    );
  }

  if (loading === 'succeeded' && surahs.length === 0) {
    return (
      <div className='text-center text-xl my-8'>
        <p>لا توجد سور لعرضها.</p>
      </div>
    );
  }

  return (
    <div className='p-3.5'>
      <h1 className='text-center text-2xl font-bold my-4'>السور</h1>
<div className='text-center  p-2 '>

<form  className="flex items-center max-w-lg mx-auto">   
    <label  className="ms-1 sr-only">Search</label>
       <button 
       type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#18A34B] rounded-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        </svg>Search
    </button>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        </div>
        <input   type="search" value={search} onChange={(e)=>setSearch(e.target.value)}   id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ابحث عن السوره" required />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          
        </button>
    </div>
 
</form>
</div>
{filterSurahs().length === 0 && (
<p>لاتوجد سور لعرضها</p>

)}
      <div className='flex justify-between items-center gap-1 flex-wrap'>
        {filterSurahs().map((surah) => (
          <motion.div  
            key={surah.number}
            className='border w-full transition-all duration-75 cursor-pointer lg:w-[33%] p-4 my-2 rounded-lg shadow-md'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ duration: 0.4 }} 
          >
            <div className='flex justify-between items-center'>
            <Link href={`/surahDetails/${surah.number}`}
              className='flex gap-5'>
                <p className='p-2 rounded-3xl bg-[#E7F5EC]'>{surah.number}</p>
                <div>
                  <h2 className='text-xl font-semibold font-[Amiri]'>{surah.name}</h2>
                  <p className='text-gray-600 text-sm'> {surah.englishName}</p>
                </div>
              </Link>
              <div>
                <p className='text-gray-600 flex items-center gap-0.5'>
                  عدد الآيات: {surah.numberOfAyahs} آية
                  <span className='text-xl font-[Amiri] text-[#18A44B]'>
                    <IoBook />
                  </span>
                </p>
                <p> مكان النزول :{surah.revelationType}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}