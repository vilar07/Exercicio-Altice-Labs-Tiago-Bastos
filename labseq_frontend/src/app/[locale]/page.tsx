"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import homepageImage from "../../../public/images/homepageImage.jpg";
import Image from "next/image";
import LoopingText from "@/components/LoopingText";
import { motion } from "framer-motion";
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputNumber } from 'primereact/inputnumber';
import {useState } from "react";
import axios from 'axios';

export default function Home() {
  const t = useTranslations('Index');
  const locale = useLocale(); // Get the current locale
  const [value, setValue] = useState<number | null>(null);
  const [result, setResult] = useState<String | null>(null);

  async function calculateLabSeq(){
    if(value === null){
      alert('Insert a non-negative integer');
    } else if (value < 0){
      setValue(null);
      setResult(null);
      alert('Insert a non-negative integer');
    }
    else{
      axios.get(`http://localhost:8080/labseq/${value}`)
        .then((response) => {
          console.log(response.data);
          setResult(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <div className="w-full grid grid-cols-1 gap-1 p-16 mt-8">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1">
        <motion.div className="w-full flex justify-center items-center" initial={{ opacity: 0, width:'0%' }} whileInView={{ opacity:100, width: '100%' }} transition={{duration:2.5}}>
          <Image src={homepageImage} alt="Logo" width={500} height={500} className="border-1 rounded-xl shadow-xl"/>
        </motion.div>
        <div className="w-full flex flex-col justify-start items-center p-8 lg:mt-32">
          <motion.h1 className="w-full text-6xl font-serif text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          initial={{opacity:0}} whileInView={{opacity:100}} transition={{duration:3}}>
            {t('title')}
          </motion.h1>
          <motion.hr
            initial={{ width: 0 }} // Inicialmente com largura 0
            whileInView={{ width: '100%' }} // Animar até 100% da largura do container quando estiver em vista
            transition={{ duration: 1 }} // Duração da animação
            viewport={{ once: true }} // A animação será executada apenas uma vez
            className="w-full mt-6 mb-8 h-1 border-0 rounded-xl bg-black"
          />
          <LoopingText 
            className='w-full !text-4xl !text-blue-400' 
            text={t('developed')}
          />
        </div>
      </div>
      <hr className="w-full border-2 mt-8"/>
      <div className="w-full grid grid-cols-1 gap-1 mt-8">
        <h1 className="w-full flex items-center justify-center text-3xl mt-4 font-bold font-serif">{t('question')}</h1>
        <div className="w-full flex items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-2 mt-4 rounded-xl p-4">
            <h2 className="w-full text-xl flex justify-center text-black text-opacity-50">{t('insert')}</h2>
            <div className='w-full flex items-center justify-center my-8'>
            <FloatLabel>
                <InputNumber className="w-full h-12 border-2 rouded-lg" inputId="withoutgrouping" value={value} onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value ?? null)} useGrouping={false} />
                <label htmlFor="value">Number</label>
            </FloatLabel>
            </div>
            <Button label="Calcular" className='w-24 p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 raised' onClick={calculateLabSeq}/>
            {result !== null && (
              <div className="w-full p-4 flex flex-col items-center justify-center">
                <h2 className="w-full flex items-center justify-center text-center text-lg text-black text-opacity-50 mt-4 underline">{t('questionCalculator')}</h2>
                <h2 className="w-full text-2xl flex text-center justify-center">{result}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
