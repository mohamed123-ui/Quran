import { fetchSurahsByRevelationOrder } from "@/app/Redux/revelationOrderSlice";
import { RootState } from "@/app/Redux/Store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RevelationOrder() {
  const dispatch = useDispatch();
  const { loading, surahs, error } = useSelector(
    (state: RootState) => state.revelationOrder
  );
  useEffect(() => {
    if (loading === "idle" || error === "failed"||surahs.length === 0) {
      dispatch(fetchSurahsByRevelationOrder());
    }
  }, [loading, error, dispatch,surahs.length]);
  if (loading === "pending" || loading === "idle" ) {
    return (
      <div className="text-center text-xl my-8">
        <p>جاري تحميل السور بترتيب النزول...

        </p>
      </div>
    );
  }
   
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold">
        ترتيب السور بترتيب النزول
      </h2>
      <div
        className="flex flex-wrap gap-1.5 mt-4 justify-between
        items-center"
      >
      {surahs.map((s: any) => ( 
        <div key={s.number} className="p-2 border font-[sans] rounded shadow w-full lg:w-[22%]">
<Link href={`/surahDetails/${s.number}`} className="flex justify-between">
                 <div className="flex gap-2">
                <p>{s.revelationOrder}</p>
                <h3>{s.name}</h3>
             </div>
             <div className=" ">
                 <h3>{s.revelationType}</h3>
                 <h4>{s.name}</h4>
             </div>
</Link>
<p> سوره {s.number}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
