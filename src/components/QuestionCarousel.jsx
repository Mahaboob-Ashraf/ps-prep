import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Code } from "lucide-react";

const QuestionCarousel = ({ title, questions, color = "blue" }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!questions || questions.length === 0) return null;

  const titleColors = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
  };

  const difficultyColor = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Hard: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // FIX 1: Add a small buffer (10px) so tiny layout shifts don't trigger the arrow
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, [questions]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-6 w-full relative group">
      {/* 1. Category Title */}
      {title && (
        <div className="flex justify-between items-end px-4 sm:px-8 mb-4">
          <h2
            className={`text-2xl font-bold ${
              titleColors[color] || "text-white"
            }`}
          >
            {title}
          </h2>
          <Link
            to={`/topic/${title.toLowerCase()}`}
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition"
          >
            See All <ChevronRight size={16} />
          </Link>
        </div>
      )}

      {/* 2. CAROUSEL WRAPPER */}
      <div className="relative">
        {/* --- LEFT BUTTON --- */}
        {/* Only appears if we are truly scrolled past the start */}
        <div
          className={`absolute left-0 top-0 bottom-6 z-20 w-16 bg-gradient-to-r from-black/90 to-transparent flex items-center justify-center transition-opacity duration-300 ${
            canScrollLeft
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scroll("left")}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <ChevronLeft className="text-white" size={40} />
          </button>
        </div>

        {/* --- SCROLL CONTAINER --- */}
        {/* FIX 2: Added 'scroll-pl-4 sm:scroll-pl-8'. This forces the snap point to respect your padding. */}
        <div
          ref={scrollRef}
          onScroll={checkScrollButtons}
          className="flex overflow-x-auto pb-6 px-4 sm:px-8 gap-4 scrollbar-hide snap-x scroll-smooth scroll-pl-4 sm:scroll-pl-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide Chrome scrollbar */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `}</style>

          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/playground/${q.id}`}
              className="flex-none w-64 snap-start group/card"
            >
              <div className="h-full p-5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        difficultyColor[q.difficulty]
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <Code
                      size={16}
                      className="text-gray-500 group-hover/card:text-blue-400 transition"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 group-hover/card:text-blue-300 transition line-clamp-2">
                    {q.title}
                  </h3>
                </div>

                <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                  <span>Start Coding</span>
                  <ChevronRight
                    size={12}
                    className="opacity-0 group-hover/card:opacity-100 transition-opacity transform group-hover/card:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- RIGHT BUTTON --- */}
        <div
          className={`absolute right-0 top-0 bottom-6 z-20 w-16 bg-gradient-to-l from-black/90 to-transparent flex items-center justify-center transition-opacity duration-300 ${
            canScrollRight
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => scroll("right")}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <ChevronRight className="text-white" size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCarousel;
