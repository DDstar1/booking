"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import CelebCard from "@/components/CelebCard";
import { Pagination } from "@heroui/react";
import AnimatedPagination from "@/components/AnimatedPagination";
import { AnimatePresence } from "framer-motion";
import CelebModalWrapper from "@/components/CelebModal";

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
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [origin, setOrigin] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const res = await fetch("/api/get_celebrities");
        if (!res.ok) throw new Error("Failed to fetch celebrities");
        const data = await res.json();
        setCelebrities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  const handleClick = (celeb, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedCeleb(celeb);
  };

  const closeModal = () => {
    setSelectedCeleb(null);
    setOrigin(null);
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    celebrities.forEach((celeb) => {
      (celeb.tags || []).forEach((tag) => tags.add(tag.trim()));
    });
    return [...tags];
  }, [celebrities]);

  const filteredCelebs = celebrities.filter((celeb) => {
    const matchesSearch = celeb.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTags =
      activeTags.length === 0 ||
      activeTags.some((tag) =>
        (celeb.tags || [])
          .map((t) => t.toLowerCase())
          .includes(tag.toLowerCase())
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
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-[#0f0f0f] text-white  mx-auto  px-4 py-20">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search celebrities..."
          className="w-full p-2 mb-4 rounded border border-gray-700 bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mb-5">
          {/* Toggle Filters Button */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Filter by Tags</h3>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-sm text-blue-400 underline"
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
              showFilters
                ? "flex flex-wrap gap-2"
                : "flex gap-2 overflow-x-auto"
            }`}
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 whitespace-nowrap rounded-full border text-sm flex-shrink-0 ${
                  activeTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-[#2a2a2a] text-gray-300 border-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
        {/* Celebrity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {paginatedCelebs.map((celeb) => (
            <CelebCard
              onClick={(e) => handleClick(celeb, e)}
              key={celeb.id}
              celeb={celeb}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center sticky bottom-1">
            <AnimatedPagination
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCeleb && origin && (
          <CelebModalWrapper
            celeb_data={selectedCeleb}
            origin={origin}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CelebritiesPage;
