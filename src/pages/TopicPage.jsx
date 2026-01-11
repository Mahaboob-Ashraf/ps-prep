import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code, ChevronRight, AlertCircle } from "lucide-react";
import { supabase } from "../supabaseClient";
import Prism from "../components/Prism";
import ShinyText from "../components/ShinyText";

const TopicPage = () => {
  const { slug } = useParams();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);

  const difficultyColor = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Hard: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  useEffect(() => {
    const fetchTopicData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("topics")
        .select("*, questions (*)")
        .ilike("title", slug)
        .single();

      if (error) {
        console.error("Error fetching topic:", error);
      } else {
        setTopicData(data);
      }
      setLoading(false);
    };

    fetchTopicData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );

  if (!topicData)
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-2xl font-bold">Topic Not Found</h2>
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          Return Home
        </Link>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full text-white bg-black">
      {/* Prism Background */}
      <div className="fixed inset-0 z-0 opacity-60">
        <Prism />
      </div>

      {/* Content */}
      {/* Adjusted padding: pt-24 for mobile, pt-32 for laptop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        {/* Header Section */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </Link>

          {/* Responsive Shiny Text Heading */}
          <div className="mb-4">
            <ShinyText
              text={topicData.title}
              disabled={false}
              speed={3}
              // text-4xl on mobile, text-6xl on laptop
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white block leading-normal pb-4"
            />
          </div>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
            Master {topicData.title} with these practice problems.
          </p>
        </div>

        {/* The Questions Grid - Already Responsive via Tailwind Classes */}
        {topicData.questions && topicData.questions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicData.questions.map((q) => (
              <Link
                key={q.id}
                to={`/playground/${q.id}`}
                className="group relative p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:bg-slate-800/50 hover:border-blue-500/80 transition-all duration-300 backdrop-blur-xl overflow-hidden shadow-lg"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/20 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded border ${
                          difficultyColor[q.difficulty] || difficultyColor.Easy
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <Code
                        size={20}
                        className="text-gray-500 group-hover:text-blue-400 transition"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition">
                      {q.title}
                    </h3>
                  </div>

                  <div className="mt-6 flex items-center text-sm text-gray-400 group-hover:text-white transition">
                    <span>Solve Challenge</span>
                    <ChevronRight
                      size={16}
                      className="ml-2 transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-slate-900/50 border border-white/10 text-center backdrop-blur-xl">
            <p className="text-gray-400">
              No questions available for this topic yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
