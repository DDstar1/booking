"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bio({ bio }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 300;

  const isLong = bio.length > MAX_LENGTH;
  const shortText = bio.slice(0, MAX_LENGTH);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="flex-1 text-center flex-col items-center text-sm text-gray-300 leading-relaxed md:ml-6">
      <AnimatePresence initial={false}>
        <motion.p
          key={expanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {expanded ? bio : `${shortText}...`}
        </motion.p>
      </AnimatePresence>

      {isLong && (
        <span
          onClick={toggleExpanded}
          className="text-blue-400 hover:underline cursor-pointer block mt-2"
        >
          {expanded ? "See Less" : "See More"}
        </span>
      )}
    </div>
  );
}
