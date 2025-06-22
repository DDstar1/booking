"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";
import Link from "next/link";

const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    y: -80,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // const handleScroll = () => {
    //   const currentY = window.scrollY;

    //   // Show nav if: at top of page OR scrolling up
    //   const shouldShow = currentY < 80 || currentY < lastScrollY - 50;

    //   console.log(`Scroll => Current: ${currentY}, Last: ${lastScrollY}`);

    //   setShowNav(shouldShow);
    //   lastScrollY = currentY;
    // };

    // window.addEventListener("scroll", handleScroll, { passive: true });
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Celebrity List", href: "/list" },
    { label: "Featured Celebrities", href: "#featured_celebrities" },
    { label: "About Us", href: "/about_us" },
    { label: "Contact Us", href: "/contact_us" },
  ];

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          key="navbar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={navVariants}
          className="sticky top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href={`/`} className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">StarBook</span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex space-x-8">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Desktop Button */}
              <div className="hidden md:flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  Book Now
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
                  {isMobileOpen ? (
                    <X className="h-6 w-6 text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="md:hidden bg-black border-t border-gray-700 mt-2 rounded-b-lg px-4 pb-4"
                >
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block text-gray-300 py-2 hover:text-white"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold">
                    Book Now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
