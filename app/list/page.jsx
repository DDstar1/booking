"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import CelebCard from "@/components/CelebCard";
import celebrities from "@/utils/celebrities";
import { Pagination } from "@heroui/react";

const collapseVariants = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  collapsed: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const CelebritiesPage = () => {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 6;

  const allTags = useMemo(() => {
    const tags = new Set();
    celebrities.forEach((celeb) => {
      celeb.role.split("|").forEach((tag) => tags.add(tag.trim()));
    });
    return [...tags];
  }, []);

  const filteredCelebs = celebrities.filter((celeb) => {
    const matchesSearch = celeb.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag) =>
        celeb.role.toLowerCase().includes(tag.toLowerCase())
      );
    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredCelebs.length / itemsPerPage);
  const paginatedCelebs = filteredCelebs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTagClick = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Current page:", page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search celebrities..."
        className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Toggle Filters Button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Filter by Tags</h3>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="text-sm text-blue-600 underline"
        >
          {showFilters ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Animated Filter Tags */}
      <motion.div
        variants={collapseVariants}
        animate={showFilters ? "expanded" : "collapsed"}
        initial={false}
        className={`overflow-hidden mb-6 ${
          showFilters ? "flex flex-wrap gap-2" : "flex gap-2 overflow-x-auto"
        }`}
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 whitespace-nowrap rounded-full border text-sm flex-shrink-0 ${
              activeTags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Celebrity Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedCelebs.map((celeb) => (
          <CelebCard key={celeb.id} celeb={celeb} />
        ))}
      </div>

      {/* Pagination (HeroUI) */}
      <div className="mt-10 flex justify-center">
        <Pagination
          color="primary"
          size="lg"
          showControls
          showShadow
          variant="bordered"
          initialPage={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CelebritiesPage;
