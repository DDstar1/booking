"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function AnimatedLinkButton({ href, text, className = "" }) {
  const defaultStyles =
    "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black";

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Link href={href}>
        <button className={`${defaultStyles} ${className}`}>{text}</button>
      </Link>
    </motion.div>
  );
}
