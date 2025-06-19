"use client"
import React from 'react'
import { motion } from 'framer-motion'
export default function page() {
  return (
    <motion.div
    initial={{opacity:0, y:-30}}
    animate={{opacity:1, y:0}}
    >
      
<div className=' w-full  lg:w-[50%] m-auto p-5 shadow-lg rounded-lg bg-white mt-10 mb-10'>
  <h2 className='text-center my-2 text-3xl font-bold'>عن التطبيق</h2>
<h3 className='text-center text-2xl text-[#64748B]'>
تطبيق القرآن الكريم لقراءة وسماع القرآن بكل سهولة ويسر
</h3>
</div>
<div className='flex p-3 flex-wrap  gap-0.5  justify-between items-center'>
<div className='p-5 w-full lg:w-[40%] shadow-lg rounded-lg bg-white mt-10 mb-10'>
<h4 className='text-2xl font-bold text-center mb-4'>
نبذة عن التطبيق:
</h4>
<p className='text-[#64748B]'>
  نقدم لك تطبيقًا مميزًا وشاملًا لمساعدتك في رحلة حفظ القرآن الكريم وتدبر آياته. يُعد هذا التطبيق رفيقك الأمثل للوصول إلى كتاب الله بسهولة ويسر، مع مزايا فريدة تعينك على الحفظ والمراجعة.
  
</p>
</div>
<div className='p-5 w-full lg:w-[40%] shadow-lg rounded-lg bg-white mt-10 mb-10'>
<h4 className='text-2xl font-bold text-center mb-4'>
  ما الذي يقدمه لك التطبيق؟
</h4>
<ul className='text-[#64748B]'>
  <li>
    عرض القرآن الكريم كاملًا: يمكنك تصفح جميع السور والأجزاء بسهولة ووضوح.
    
  </li>
  <li>
    بحث سريع وفعال: يمكنك البحث عن أي سورة تريدها والوصول إليها مباشرة دون عناء.
  </li>
  <li>
    استماع للقرآن بأصوات متنوعة: اختر القارئ المفضل لديك واستمع إلى تلاوات خاشعة تساعدك على التركيز والتدبر.
    
  </li>
  <li>
    اختبر حفظك: ميزة فريدة تساعدك على اختبار نفسك في حفظ القرآن الكريم من خلال:
    
  </li>
  <li>
    الإملاء الصوتي: استمع إلى آيات، ثم قم بإملائها صوتيًا لتقييم مدى إتقانك للحفظ.
    
  </li>
  <li>
    الإملاء الكتابي: اكتب الآيات التي تسمعها أو تتذكرها، لتقييم دقة حفظك.
    
  </li>
  <li>وضع الدارك مود (الوضع الليلي): للحفاظ على راحة عينيك وتجربة قراءة مريحة، خاصة أثناء القراءة في الإضاءة المنخفضة.
  

  </li>
</ul>
</div>
</div>
    </motion.div>
  )
}
