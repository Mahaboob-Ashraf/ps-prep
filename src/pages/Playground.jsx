import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  ChevronRight,
  ChevronDown,
  Loader2,
  Terminal,
  Send,
  Bot,
  BookOpen,
  Code2,
} from "lucide-react";
import { supabase } from "../supabaseClient";
import Editor from "@monaco-editor/react";

const Playground = () => {
  const { id } = useParams();

  // Data States
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI States
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [code, setCode] = useState("// Loading...");

  // Compiler States
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);

  // Chat States
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I have full context of this problem and your code. Ask me anything if you get stuck!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select(
          `id, title, difficulty, problem_statement, hidden_answer, detailed_explanation, topics ( title )`
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching question:", error);
      } else {
        setQuestion(data);
        setCode(
          `# Write your solution for: ${data.title}\n\ndef solve():\n    # Your code here\n    pass`
        );
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [id]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setIsError(false);
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ content: code }],
        }),
      });
      const data = await response.json();
      if (data.run) {
        setOutput(data.run.output);
        setIsError(data.run.code !== 0);
      } else {
        setOutput("Error: Could not execute code.");
        setIsError(true);
      }
    } catch (error) {
      setOutput("Network Error: Failed to reach compiler.");
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-tutor", {
        body: {
          query: input,
          context: {
            title: question.title,
            problem: question.problem_statement,
            userCode: code,
            language: "python",
          },
        },
      });

      if (error) throw error;
      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Connection error. Please try again or check your internet.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Loading Playground...
      </div>
    );
  if (!question)
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Question Not Found
      </div>
    );

  const topicTitle =
    question.topics?.title ||
    (Array.isArray(question.topics) ? question.topics[0]?.title : null);
  const backLink = topicTitle ? `/topic/${topicTitle.toLowerCase()}` : "/";

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans pt-20 flex flex-col">
      {/* 1. Header */}
      <div className="h-12 border-b border-white/10 bg-black flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            to={backLink}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">
              Problem List
            </span>
          </Link>
          <div className="h-4 w-px bg-white/10"></div>
          <span className="font-semibold text-sm truncate max-w-[200px] sm:max-w-none">
            {id}. {question?.title}
          </span>
        </div>
      </div>

      {/* --- RESPONSIVE LAYOUT CONTAINER --- */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 gap-4 sm:gap-6 max-w-[1600px] mx-auto w-full">
        {/* 2. TOP SECTION: Stack vertically on mobile, Row on Laptop */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[75vh]">
          {/* LEFT PANEL: Description */}
          {/* On Mobile: Fixed Height 400px. On Laptop: Full Height */}
          <div className="w-full lg:w-1/3 h-[400px] lg:h-full bg-[#1e1e1e] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl order-2 lg:order-1">
            <div className="h-12 border-b border-white/10 bg-[#262626] flex items-center px-6 shrink-0">
              <span className="text-blue-400 text-sm font-bold border-b-2 border-blue-400 h-full flex items-center">
                Description
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {question?.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    question?.difficulty === "Easy"
                      ? "text-green-400 bg-green-900/30"
                      : question?.difficulty === "Medium"
                      ? "text-yellow-400 bg-yellow-900/30"
                      : "text-red-400 bg-red-900/30"
                  }`}
                >
                  {question?.difficulty}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                  {topicTitle || "General"}
                </span>
              </div>
              <div className="text-gray-300 leading-8 text-sm space-y-4 whitespace-pre-wrap">
                {question?.problem_statement?.replace(/\\n/g, "\n")}
              </div>

              {/* Solution/Explanation Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="rounded-lg border border-white/10 overflow-hidden bg-[#262626]">
                  <div
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <Code2 size={16} className="text-purple-400" /> Reveal
                      Answer
                    </div>
                    {showSolution ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>
                  {showSolution && (
                    <div className="p-3 bg-black/50 border-t border-white/10">
                      <code className="text-xs font-mono text-green-400 whitespace-pre-wrap block">
                        {question?.hidden_answer?.replace(/\\n/g, "\n")}
                      </code>
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-white/10 overflow-hidden bg-[#262626]">
                  <div
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <BookOpen size={16} className="text-blue-400" />{" "}
                      Explanation
                    </div>
                    {showExplanation ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>
                  {showExplanation && (
                    <div className="p-3 bg-black/50 border-t border-white/10">
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {question?.detailed_explanation?.replace(/\\n/g, "\n")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Editor & Console */}
          {/* On Mobile: Fixed Height 600px (tall). On Laptop: Full Height */}
          <div className="w-full lg:flex-1 h-[600px] lg:h-full bg-[#1e1e1e] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl order-1 lg:order-2">
            <div className="h-12 border-b border-white/10 bg-[#262626] flex items-center justify-between px-4 shrink-0">
              <span className="text-xs text-green-400 px-2 sm:px-3 py-1 rounded bg-green-400/10 border border-green-400/20 font-mono">
                Python 3.10
              </span>
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 sm:px-6 py-1.5 rounded-md text-xs font-bold transition text-white shadow-lg ${
                  isRunning
                    ? "bg-blue-600/50"
                    : "bg-blue-600 hover:bg-blue-500 hover:scale-105"
                }`}
              >
                {isRunning ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Play size={14} fill="currentColor" />
                )}{" "}
                {isRunning ? "Running..." : "Run Code"}
              </button>
            </div>

            <div className="flex-1 relative border-b border-white/10">
              <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                theme="vs-dark"
                onChange={(value) => setCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 },
                  lineNumbers: "on",
                }}
              />
            </div>

            <div className="h-48 bg-[#151515] flex flex-col border-t border-white/10 shrink-0">
              <div className="h-8 bg-[#262626] flex items-center px-4 gap-2 border-b border-white/5">
                <Terminal size={12} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Output Terminal
                </span>
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                {output ? (
                  <pre
                    className={`${
                      isError ? "text-red-400" : "text-gray-300"
                    } whitespace-pre-wrap`}
                  >
                    {output}
                  </pre>
                ) : (
                  <div className="text-gray-600 italic">
                    Run code to see output...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: AI Tutor */}
        <div className="h-[500px] w-full bg-[#1e1e1e] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-2xl mb-8 order-3">
          <div className="h-14 border-b border-white/10 bg-[#262626] flex items-center px-6 gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Bot size={18} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-purple-400 text-sm font-bold uppercase tracking-wider">
                AI Teaching Assistant (Context Aware)
              </h3>
              <p className="text-[10px] text-gray-500 hidden sm:block">
                Powered by Gemini 2.5
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-6 bg-[#151515]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 sm:gap-4 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 mt-1 hidden sm:flex">
                    <Bot size={16} className="text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-[#262626] text-gray-200 border border-white/5 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="bg-[#262626] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 bg-[#1e1e1e] border-t border-white/10"
          >
            <div className="relative flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for a hint..."
                className="flex-1 bg-[#262626] text-white text-sm rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-white/5 placeholder:text-gray-500 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-4 sm:px-6 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Send</span>{" "}
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Playground;
