"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AnimatedPagination = ({ total, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0); // +1 for forward, -1 for backward

  const handlePageChange = (page) => {
    if (page < 1 || page > total || page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    onChange?.(page);
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {/* Pagination buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: total }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === num
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-100"
          disabled={currentPage === total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimatedPagination;
