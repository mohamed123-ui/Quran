'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ManualTest from '../page/manualTest/ManualTest';
import SpeechPage from '../page/AudioTest/AudioTest';

export default function Page() {
  const [showManualTest, setShowManualTest] = useState(false);
  const [showAudioTest, setShowAudioTest] = useState(false);
  const handleManualClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowManualTest(true);
    setShowAudioTest(false);
  };
  const handleAudioTestClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowAudioTest(true);
    setShowManualTest(false);
  };
  return (
    <div>
      <motion.h1
        className="text-3xl md:text-5xl my-2.5 font-bold mb-10 text-center text-green-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        احفظ القرآن بالذكاء الاصطناعي
      </motion.h1>

      <div className="flex m-auto gap-6 w-full max-w-sm">
        <motion.button
          onClick={handleManualClick}
          className="w-full bg-white cursor-pointer border-2 border-green-600 text-green-700 font-semibold py-3 px-6 rounded-2xl shadow hover:bg-green-600 hover:text-white transition"
          whileHover={{ scale: 1.05 }}
        >
           اختبار إخفاء الكلمات
        </motion.button>

        <motion.button
         onClick={handleAudioTestClick}
          className="w-full bg-white border-2 border-green-600 text-green-700 font-semibold py-3 px-6 rounded-2xl shadow hover:bg-green-600 hover:text-white transition"
          whileHover={{ scale: 1.05 }}
        >
           اختبار الإملاء الصوتي
        </motion.button>
      </div>

      {showManualTest && <ManualTest />}
      {showAudioTest && <SpeechPage/>}
    </div>
  );
}
