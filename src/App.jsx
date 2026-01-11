import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { BookOpen, Database, ArrowDown } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DarkVeil from "./components/DarkVeil";
import BlurText from "./components/BlurText";
import ShinyText from "./components/ShinyText";
import CountdownTimer from "./components/CountdownTimer";
import CountUp from "./components/CountUp";
import QuestionCarousel from "./components/QuestionCarousel";
import TopicPage from "./pages/TopicPage";
import Playground from "./pages/Playground";
import About from "./pages/About";

// --- HOME PAGE COMPONENT ---
const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { data } = await supabase.from("topics").select("*, questions (*)");
      if (data) setTopics(data.sort((a, b) => a.id - b.id));
    };
    fetchTopics();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-10 px-4">
        {/* Main Content Wrapper */}
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center gap-6 sm:gap-10">
          {/* A. Title & Subtitle */}
          <div>
            <BlurText
              text="Welcome to PS-Prep!"
              className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 text-white tracking-tighter block drop-shadow-2xl"
              delay={150}
            />
            <p className="text-lg sm:text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto px-4">
              Everything you need for PS exam prep, all in one place.
            </p>
          </div>

          {/* B. The Countdown */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full mt-4">
            <p className="text-xl sm:text-3xl text-blue-100 uppercase tracking-[0.2em] font-semibold">
              Exam Begins In
            </p>

            {/* Glass Container */}
            <div className="p-4 sm:p-6 sm:px-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl scale-90 sm:scale-100 origin-center">
              <CountdownTimer />
            </div>
          </div>

          {/* C. Stats Row */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-16 justify-center mt-4">
            {/* Stat 1: Questions (Blue) */}
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-3 mb-1">
                <Database
                  size={24}
                  className="text-blue-400 group-hover:text-blue-300 transition"
                />
                <div className="text-3xl sm:text-5xl font-bold text-white flex items-center">
                  <CountUp from={0} to={200} separator="," duration={2} />
                  <span className="text-blue-500 ml-1">+</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                Questions
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

            {/* Stat 2: Topics (Purple) */}
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-3 mb-1">
                <BookOpen
                  size={24}
                  className="text-purple-400 group-hover:text-purple-300 transition"
                />
                <div className="text-3xl sm:text-5xl font-bold text-white flex items-center">
                  <CountUp from={0} to={10} separator="," duration={2} />
                  <span className="text-purple-500 ml-1">+</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                Topics
              </p>
            </div>
          </div>

          {/* D. Footer Text */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mt-2">
            <span className="text-sm text-gray-400 font-light tracking-wide">
              And adding,{" "}
              <span className="text-gray-200 font-medium">From FDS</span>.
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowDown size={24} className="text-white" />
        </div>
      </div>

      {/* 2. LIBRARY SECTION */}

      {/* Title (Stays outside the background logic so it floats nicely) */}
      <div className="relative z-20 py-10 px-4 text-center">
        <ShinyText
          text="Hot Questions (Important)"
          disabled={false}
          speed={1.3}
          className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg block"
        />
      </div>

      {/* THE FIX: Separate Background Layer from Content Layer */}
      <div className="relative w-full pb-32">
        {/* Layer A: The Background (Has the Blur & The Mask) */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xl"
          style={{
            // This mask fades the BACKGROUND in, but doesn't touch the text
            maskImage: "linear-gradient(to bottom, transparent, black 150px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 150px)",
            zIndex: 0,
          }}
        ></div>

        {/* Layer B: The Content (NO Mask, fully visible) */}
        <div className="relative z-10 max-w-7xl mx-auto space-y-12 pt-10 px-4">
          {topics.map(
            (topic) =>
              topic.questions &&
              topic.questions.length > 0 && (
                <QuestionCarousel
                  key={topic.id}
                  title={topic.title}
                  questions={topic.questions}
                  color="purple"
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="bg-black text-white min-h-screen selection:bg-purple-500 selection:text-white">
        {/* 1. Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <DarkVeil />
        </div>

        {/* 2. Global Navigation */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />

        {/* 3. Page Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/topic/:slug" element={<TopicPage />} />
            <Route path="/playground/:id" element={<Playground />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
