import { motion, AnimatePresence } from "framer-motion";

export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  colorScheme,
  children,
}) {
  const colorMap = {
    blue: "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200",
    green:
      "from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200",
    purple:
      "from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200",
    orange:
      "from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200",
  };

  return (
    <section>
      <button
        onClick={onToggle}
        className={`w-full text-left text-xl font-semibold mb-4 px-4 py-3 rounded-xl bg-gradient-to-r ${colorMap[colorScheme]} transition-all duration-200 border`}
      >
        {title} {isOpen ? "▲" : "▼"}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
