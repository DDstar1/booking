import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X, UserCircle, LogOut } from "lucide-react";

const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { y: -80, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with real auth
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowNav(currentY < 80 || currentY < lastScrollY);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { label: "Browse", href: "#celebrities" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          key="navbar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={navVariants}
          className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">StarBook</span>
              </div>

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

              {/* Desktop Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center text-white hover:text-blue-400 transition"
                    >
                      <UserCircle className="h-8 w-8" />
                    </button>
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-lg shadow-lg z-10"
                        >
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="text-white hover:text-blue-400 font-medium transition"
                  >
                    Login
                  </button>
                )}

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
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 flex items-center justify-center text-red-400 hover:text-red-500 gap-2 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsMobileOpen(false);
                      }}
                      className="w-full mt-2 text-white hover:text-blue-400 py-2"
                    >
                      Login
                    </button>
                  )}
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
