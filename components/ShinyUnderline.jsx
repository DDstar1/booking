"use client";
import React from "react";
import { motion } from "framer-motion";

function ShinyUnderline() {
  const shimmerVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const sharedStyle = {
    backgroundSize: "200% 200%",
  };

  return (
    <>
      {/* Blur shimmer (full width) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] blur-sm bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        variants={shimmerVariants}
        animate="animate"
        style={sharedStyle}
      />
      {/* Crisp shimmer (full width) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        variants={shimmerVariants}
        animate="animate"
        style={sharedStyle}
      />
      {/* Blur accent (shorter) */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[5px] w-1/4 blur-sm bg-gradient-to-r from-transparent via-sky-500 to-transparent"
        variants={shimmerVariants}
        animate="animate"
        style={sharedStyle}
      />
      {/* Crisp accent (shorter) */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
        variants={shimmerVariants}
        animate="animate"
        style={sharedStyle}
      />
    </>
  );
}

export default ShinyUnderline;
