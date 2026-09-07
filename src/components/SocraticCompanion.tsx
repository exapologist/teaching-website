/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Message, Course } from "../types";
import { Sparkles, Send, RotateCcw, AlertCircle, Compass } from "lucide-react";

interface SocraticCompanionProps {
  course: Course;
}

const CONTEXTS_SUGGESTIONS: Record<string, string[]> = {
  phil101: [
    "How does Descartes prove his own existence via 'Cogito'?",
    "What is the main allegory behind Plato's Cave?",
    "What is the mind-body problem?"
  ],
  phil101h: [
    "What are the major criticisms of Socratic Sarcasm?",
    "How does Kant's Copernican Revolution change epistemology?",
    "Could you explain Aristotle's Hylomorphism?"
  ],
  phil103: [
    "What is John Stuart Mill's Greatest Happiness Principle?",
    "Can you explain Kant's Categorical Imperative?",
    "What is virtue ethics' description of acting well?"
  ],
  phil105: [
    "What is the difference between inductive and deductive reasoning?",
    "Can you explain the Straw Man fallacy with an example?",
    "What is Begging the Question?"
  ],
  phil106: [
    "What is the distinction between soundness and validity?",
    "How do we construct a truth table for implication (P → Q)?",
    "Can you explain the rule of Modus Tollens?"
  ],
  phil107: [
    "What is the logical problem of evil?",
    "Can you explain the Cosmological argument for God from Aquinas?",
    "What is Pascal's Wager and its philosophical critiques?"
  ],
  phil111: [
    "Who were the Pre-Socratics and what did they seek?",
    "How does Plato differentiate between knowledge and opinion?",
    "How does Saint Thomas Aquinas unify Aristotle and Christianity?"
  ],
  phil112: [
    "How does David Hume formulate the problem of induction?",
    "What does Descartes mean by the Evil Demon hypothesis?",
    "How does Kant resolve the rationalism vs. empiricism debate?"
  ],
  phil117: [
    "What is Thomas Hobbes' state of nature like?",
    "What is John Locke's justification for private property?",
    "How does John Rawls explain the 'veil of ignorance'?"
  ],
  phil374: [
    "What are the four core principles of bioethics?",
    "Can you explain the moral dilemma of resource allocation?",
    "Under what conditions is patient autonomy restricted?"
  ]
};

export default function SocraticCompanion({ course }: SocraticCompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Greetings! I am Prof. Felipe Leon. Welcome to our Socratic Study Companion for **${course.num}: ${course.title}**. Let's dive deep into philosophical inquiry. What question or reading snippet from our syllabus can we explore together today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = CONTEXTS_SUGGESTIONS[course.id] || [
    "What is the difference between truth and validity?",
    "What is Socratic dialogue?",
    "Are moral claims objective or subjective?"
  ];

  // Auto-scroll to end of conversations
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setError(null);
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Gather relevant short history for context (last 5 messages)
      const chatHistory = messages
        .filter(m => m.id !== "welcome")
        .slice(-5)
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch("/api/socratic-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          message: textToSend,
          history: chatHistory
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to contact Socratic assistant endpoint.");
      }

      const data = await res.json();
      
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please check your network and API secrets configuration.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Greetings! I am Prof. Felipe Leon. Welcome to our Socratic Study Companion for **${course.num}: ${course.title}**. Let's dive deep into philosophical inquiry. What question or reading snippet from our syllabus can we explore together today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setError(null);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[525px] border border-slate-200/90 bg-slate-50/40 rounded-2xl shadow-inner mt-4 overflow-hidden relative">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/60 bg-white select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
            Socratic Dialogue Partner · Real-time Mode
          </span>
        </div>
        <button
          onClick={resetChat}
          title="Reset Socratic Conversation"
          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Conversation Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[85%] flex flex-col">
              {msg.role === "assistant" && (
                <span className="text-[10px] uppercase font-extrabold text-slate-400 mb-1 pl-1 select-none flex items-center gap-1">
                  Prof. Felipe Leon <Sparkles className="w-3 h-3 text-blue-500" />
                </span>
              )}
              <div
                className={`p-4.5 rounded-2xl text-[12.5px] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-tr from-blue-600 to-indigo-650 text-white self-end font-sans rounded-tr-none px-4 py-3"
                    : "bg-white text-slate-800 border border-slate-100 font-serif rounded-tl-none prose prose-sm prose-stone max-w-none"
                }`}
              >
                <p className="whitespace-pre-line text-[12.5px]">
                  {msg.content}
                </p>
              </div>
              <span className={`text-[9px] text-slate-400 mt-1 select-none ${
                msg.role === "user" ? "text-right pr-1" : "text-left pl-1"
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex flex-col max-w-[85%]">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 mb-1 pl-1">
                Prof. Leon is contemplating...
              </span>
              <div className="bg-white text-slate-800 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none text-xs flex items-center space-x-1.5 shadow-sm">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-start gap-3 max-w-full shadow-sm">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold mb-1">Teaching Connection Interrupted</p>
              <p className="text-[11.5px] leading-relaxed opacity-90">{error}</p>
              <p className="mt-2 text-[10px] opacity-75 font-semibold text-slate-500 uppercase tracking-wider">
                Note: Configure GEMINI_API_KEY inside AI Studio Secrets menu.
              </p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Prompts */}
      {messages.length === 1 && !loading && (
        <div className="px-4 py-3 bg-white border-t border-slate-200/50 select-none">
          <p className="text-[9.5px] uppercase font-extrabold text-slate-400 mb-2 tracking-widest pl-1 leading-none">Suggested Seminar Prompts:</p>
          <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="text-xs font-semibold text-slate-600 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 transition-all px-3 py-1.5 rounded-full italic text-left"
              >
                "{sug}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Input Panel */}
      <div className="p-3.5 border-t border-slate-200/50 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Introduce a concept or question (e.g. 'Explain Plato's Cave allegory')..."
            className="flex-1 px-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all text-slate-800 font-sans"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4.5 py-2.5 bg-gradient-to-tr from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-200 disabled:to-slate-300 text-white disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
