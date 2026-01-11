import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Zap,
  Linkedin,
  Instagram,
  Star,
  Crown, // Added Crown for the Hall of Fame
} from "lucide-react";
import LightRays from "../components/LightRays";
import ShinyText from "../components/ShinyText";

const About = () => {
  const contributors = [
    { name: "Hafeez uddin" },
    { name: "Arshlaan" },
    { name: "Ashreta" },
    { name: "Soumith" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden pt-24 pb-20 px-4">
      {/* 1. BACKGROUND VISUALS */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <LightRays />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* --- SECTION 1: HERO & PRODUCT STORY --- */}
        <div className="text-center space-y-8 mb-32">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-white mb-4 transition px-4 py-2 rounded-full border border-white/5 hover:border-white/10 hover:bg-white/5 backdrop-blur-md"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>

          {/* Headline */}
          <div className="space-y-4">
            <div className="py-6 px-4">
              <ShinyText
                text="What is PS-Prep?"
                disabled={false}
                speed={3}
                className="px-2 text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter block drop-shadow-2xl leading-normal"
              />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              Introducing the platform to make all our lives easier.
            </p>
          </div>

          {/* THE MAIN CONTAINER BLOCK */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-xl text-left shadow-2xl space-y-12">
            {/* 1. THE STORY */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-purple-400" size={20} />
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                  The Story
                </span>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                  We have the{" "}
                  <span className="text-white font-semibold">PS Exam</span>{" "}
                  coming up suddenly, resources are scattered everywhere, and
                  frankly, it's hard on everyone right now.
                </p>
                <p>
                  So, I built{" "}
                  <span className="text-white font-semibold">PS-Prep</span> to
                  solve this exact problem. Instead of switching between tabs,
                  copy-pasting into ChatGPT, trying to run code in VS Code, and
                  then evaluating it elsewhere... you get all of this in{" "}
                  <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">
                    ONE PLACE
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* 2. THE SOLUTION */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="text-blue-400" size={20} />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  The Solution
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/50 transition duration-300">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-400" size={18} />{" "}
                    Context-Aware AI
                  </h3>
                  <p className="text-gray-400 text-sm">
                    The chatbot knows the question, the solution, and{" "}
                    <span className="text-gray-200">YOUR specific code</span>.
                    Just ask your doubt directly.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/50 transition duration-300">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-purple-400" size={18} /> FDS
                    Standard
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Practice questions from our FDS class, curated and labeled
                    by <span className="text-gray-200">difficulty</span> for
                    structured learning.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-green-500/50 transition duration-300">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-green-400" size={18} />{" "}
                    Curated Hot Topics
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Hand-picked critical questions for each topic to iterate
                    through important concepts with ease.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-pink-500/50 transition duration-300">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <Zap className="text-pink-400" size={18} /> Instant Compiler
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Built-in Python environment. Run and debug your code
                    instantly without switching to VS Code or external tools.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. THE END LINE */}
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-gray-400 italic text-base sm:text-lg">
                And yes, give a moment to appreciate and enjoy the cool
                background visuals. <br className="hidden sm:block" />
                <span className="text-white font-bold not-italic mt-2 inline-block">
                  HAPPY PRACTICE!
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: DEVELOPER & COMMUNITY --- */}
        <div className="relative pt-10 border-t border-white/10">
          {/* 1. Profile Photo & Bio */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              {/* PLACEHOLDER IMAGE */}
              <img
                src="/6.jpg"
                alt="Mahaboob Ashraf"
                className="relative w-32 h-32 rounded-full border-2 border-white/20 object-cover shadow-2xl"
                onError={(e) => {
                  e.target.src = "https://github.com/shadcn.png";
                }}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Hey, I'm Mahaboob Ashraf.
              </h2>
              <p className="text-gray-500 font-medium text-sm mt-1">
                (I built this website)
              </p>
              <p className="text-gray-400 max-w-md mt-6 leading-relaxed mx-auto italic">
                Yeah, the same{" "}
                <span className="text-white not-italic font-semibold">
                  beard guy
                </span>{" "}
                who always walks into FDS late and heads straight for the first
                bench. 😅
              </p>
            </div>
          </div>

          {/* 2. HALL OF FAME (UPDATED) */}
          <div className="mt-20 mb-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Crown className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">
                Hall of Fame
              </span>
              <Crown className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>

            <p className="text-gray-400 text-center text-sm mb-8 max-w-lg mx-auto">
              Huge thanks to the legends who gathered the questions and data,
              without whom this project wouldn't exist!.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {contributors.map((person, index) => (
                <div
                  key={index}
                  className="group relative p-[1px] rounded-xl bg-gradient-to-b from-white/10 to-transparent hover:from-yellow-500/50 hover:to-amber-600/50 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="bg-[#0a0a0a] rounded-xl p-4 h-full flex flex-col items-center justify-center border border-white/5 group-hover:border-transparent transition-all">
                    {/* Star Icon */}
                    <div className="mb-3 p-2 bg-white/5 rounded-full group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition-colors text-slate-500">
                      <Star className="w-4 h-4 fill-current" />
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {person.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Contact & Contribute */}
          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Wanna be a part and contribute?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              This project is for us. If you have a better solution, a new
              question, or found a mistake, let me know.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mohammad-mahaboob-ashraf-a0b17b321/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0077b5] hover:bg-[#006396] text-white font-medium shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <Linkedin size={18} />
                <span>Connect on LinkedIn</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mohammedmahaboobashraf/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-medium shadow-lg shadow-pink-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <Instagram size={18} />
                <span>DM on Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-16 pb-8">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
            © 2026 PS-Prep Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
