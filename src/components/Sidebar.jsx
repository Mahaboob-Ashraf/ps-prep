import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "../supabaseClient";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { data } = await supabase
        .from("topics")
        .select("*")
        .order("id", { ascending: true });

      if (data) setTopics(data);
    };

    if (isOpen) {
      fetchTopics();
    }
  }, [isOpen]);

  return (
    <>
      {/* --- CSS FOR THE PROFESSIONAL SCROLLBAR --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px; /* Very thin width */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Invisible track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2); /* Subtle glass white */
          border-radius: 20px; /* Pill shape */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4); /* Brighter on hover */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>

      {/* 1. The Backdrop (Dark overlay when menu is open) */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* 2. The Glass Sidebar */}
      {/* Changed bg-slate-900/90 to bg-slate-900/60 for more transparency */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-white tracking-tighter">
              PS-Prep
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Topic List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 pl-2">
              Topics
            </p>

            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={`/topic/${topic.title.toLowerCase()}`}
                onClick={toggleSidebar}
                className="flex items-center justify-between p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen
                    size={18}
                    className="text-blue-500 group-hover:text-blue-400"
                  />
                  <span className="font-medium">{topic.title}</span>
                </div>
                <ChevronRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-gray-500"
                />
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              © 2026 PS-Prep Platform
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
