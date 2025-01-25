"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "FIND CLOTHES THAT MATCHES YOUR STYLE";
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1)); // Slice ensures no undefined value
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col lg:flex-row md:flex-row font-IntegralCF justify-center items-center m-auto text-black relative bg-[#F2F0F1] w-full h-auto gap-6 px-4">
      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center lg:pl-24 sm:pl-0 m-auto z-10">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-IntegralCF w-full sm:w-[577px] sm:ml-2 text-[40px] sm:text-[64px] font-extrabold sm:text-left tracking-tight"
        >
          {text}
        </motion.h1>

        <p className="font-Satoshi text-[14px] sm:text-[16px] text-black/60 font-normal leading-[22px] text-left tracking-tight">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>

        {/* Button */}
        <Link href="/casual">
          <button className="mt-4 mb-3 w-[270px] h-[52px] bg-black text-white py-3 rounded-[100px] transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-gray-800">
            Shop
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 h-auto relative z-0"
      >
        <Image
          src="/Rectangle 4.png"
          alt="Hero Image"
          layout="responsive"
          width={800}
          height={600}
          objectFit="contain"
          className="object-center"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
