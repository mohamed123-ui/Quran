"use client";
import { fetchSurahsByRevelationOrder } from "@/app/Redux/revelationOrderSlice";
import { AppDispatch, RootState } from "@/app/Redux/Store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Surah = {
  number: number;
  name: string;
  englishName: string;
  revelationType: string;
  revelationOrder: number;
};

export default function RevelationOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, surahs, error } = useSelector(
    (state: RootState) => state.revelationOrder
  );

  useEffect(() => {
    if (loading === "idle" || error === "failed" || surahs.length === 0) {
      dispatch(fetchSurahsByRevelationOrder());
    }
  }, [loading, error, dispatch, surahs.length]);

  if (loading === "pending" || loading === "idle") {
    return (
      <div className="text-center text-xl my-8">
        <p>جاري تحميل السور بترتيب النزول...</p>
      </div>
      
    );
  }
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        ترتيب السور حسب النزول
      </h2>

      <div className="flex flex-wrap gap-2 justify-between">
        {surahs.map((s: Surah) => (
          <Link
            key={s.number}
            href={`/surahDetails/${s.number}`}
            className="p-3 border rounded-lg shadow w-full sm:w-[48%] md:w-[30%] lg:w-[22%] hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold">
                {s.revelationOrder}.
              </span>
              <span className="text-green-700 font-bold">{s.name}</span>
            </div>

            <div className="text-sm text-gray-500 flex justify-between">
              <span>{s.revelationType === "Meccan" ? "مكية" : "مدنية"}</span>
              <span>سورة رقم {s.number}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
