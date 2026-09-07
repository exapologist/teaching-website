/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Quiz, QuizQuestion } from "../types";
import { DEFAULT_QUIZZES } from "../data/courses";
import { 
  Sparkles, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertTriangle,
  Bookmark,
  Compass,
  ChevronRight
} from "lucide-react";

export default function QuizSection() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  // Custom Quiz generation inputs
  const [useAi, setUseAi] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Active Quiz Game State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleGenerateAiQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setAiGenerating(true);
    setAiError(null);

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic.trim() })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to generate dynamic philosophy quiz.");
      }

      const generatedQuiz: Quiz = await res.json();
      
      // Ensure it has a valid ID
      generatedQuiz.id = `ai-${Date.now()}`;
      
      // Select the quiz immediately
      startQuiz(generatedQuiz);
      
      // Optionally add it to our quizzes list
      setQuizzes(prev => [generatedQuiz, ...prev]);
      setAiTopic("");
      setUseAi(false);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Could not generate AI quiz. Please verify that your backend has process.env.GEMINI_API_KEY configured.");
    } finally {
      setAiGenerating(false);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerRevealed(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    setAiError(null);
  };

  const selectOption = (optIdx: number) => {
    if (isAnswerRevealed) return;
    setSelectedOptionIdx(optIdx);
  };

  const revealAnswer = () => {
    if (selectedOptionIdx === null || isAnswerRevealed) return;

    const currentQuestion = activeQuiz?.questions[currentQuestionIdx];
    if (currentQuestion && selectedOptionIdx === currentQuestion.answerIndex) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setIsAnswerRevealed(true);
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetActiveQuiz = () => {
    if (activeQuiz) {
      startQuiz(activeQuiz);
    }
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
    setQuizFinished(false);
  };

  return (
    <div className="bg-gradient-to-b from-white/95 to-slate-50/90 border border-slate-200/80 p-6 sm:p-8 select-none shadow-xl shadow-slate-100/55 rounded-2xl relative">
      <div className="mb-7 flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-blue-600 block mb-1">
            Student Assessment Center
          </span>
          <h3 className="font-serif font-bold text-2xl text-[#0f172a] tracking-tight leading-tight">
            Interactive Socratic Quizzes
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium max-w-xl">
            Test your comprehension of core philosophical principles. Choose our verified syllabus questions or prompt the Socratic AI to construct a fully personalized seminar assessment.
          </p>
        </div>

        {!activeQuiz && (
          <div className="flex bg-slate-100/80 p-1 rounded-full border border-slate-250 shrink-0 self-start md:self-auto shadow-inner">
            <button
              onClick={() => { setUseAi(false); setAiError(null); }}
              className={`px-4 py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                !useAi 
                  ? "bg-[#0f172a] text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Preset Catalog
            </button>
            <button
              onClick={() => { setUseAi(true); setAiError(null); }}
              className={`px-4 py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                useAi 
                  ? "bg-[#0f172a] text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Dynamic AI Quiz
            </button>
          </div>
        )}
      </div>

      {/* QUIZ SELECTION DASHBOARD */}
      {!activeQuiz && (
        <>
          {!useAi ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  className="p-5 border border-slate-200/70 bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#f0f4ff] hover:border-blue-400 transition-all duration-300 flex flex-col justify-between rounded-xl hover:shadow-lg shadow-sm relative group"
                >
                  <div className="absolute top-3 right-3 text-slate-300 group-hover:text-blue-500 transition-colors">
                    <Bookmark className="w-4 h-4 fill-none" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#3b82f6] font-bold block bg-blue-50/70 border border-blue-100 px-2 py-0.5 rounded-full w-fit">
                      {quiz.topic}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#0f172a] mt-3 mb-2 leading-tight">
                      {quiz.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-500 leading-relaxed mb-4 font-serif">
                      A structured {quiz.questions.length}-question module analyzing essential conceptual logic gates, axioms, or dilemmas.
                    </p>
                  </div>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full text-center py-2.5 bg-slate-50 hover:bg-[#0f172a] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0f172a] font-extrabold text-[10px] tracking-widest uppercase transition-all rounded-lg cursor-pointer flex items-center justify-center gap-1 group/btn"
                  >
                    <span>Launch assessment</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-all" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleGenerateAiQuiz} className="p-6 border border-slate-200/70 bg-white rounded-xl max-w-xl mx-auto shadow-sm">
              <h4 className="font-serif font-bold text-xl text-[#0f172a] mb-2.5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Prompt Socratic AI Quiz
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                Input any subfield, historical period, philosopher, or debate (e.g. <em>"Stoic Ethics"</em>, <em>"Hume's Critical Skepticism"</em>, <em>"Mind-Body Dualism"</em>, or <em>"The Trial of Socrates"</em>). Gemini will construct a rigorous diagnostic assessment matching your instructions.
              </p>

              <div className="flex flex-col gap-3.5">
                <input
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  disabled={aiGenerating}
                  placeholder="E.g., Kantian Ethics, Cartesian Skepticism, Epistemology..."
                  className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all text-[#0f172a] font-sans"
                />

                <button
                  type="submit"
                  disabled={aiGenerating || !aiTopic.trim()}
                  className="py-3 bg-gradient-to-r from-[#1e293b] to-[#0f172a] hover:from-blue-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-900/10 transition-all duration-200 text-xs uppercase font-extrabold tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {aiGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Formulating 5 Seminar Questions...
                    </>
                  ) : (
                    "Draft Quiz with Gemini Assistant"
                  )}
                </button>
              </div>

              {aiError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs mt-5 flex items-start gap-3 shadow-sm">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-0.5">Could Not Construct Assessment Unit</p>
                    <p className="text-[11px] leading-relaxed text-red-700/95">{aiError}</p>
                  </div>
                </div>
              )}
            </form>
          )}
        </>
      )}

      {/* ACTIVE QUIZ GAME INTERFACE */}
      {activeQuiz && !quizFinished && (
        <div className="border border-slate-200/60 p-5 sm:p-7 bg-white rounded-xl shadow-inner relative">
          {/* Quiz Top Metadata */}
          <div className="flex justify-between items-center pb-4.5 border-b border-slate-100 mb-6 select-none">
            <div>
              <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#3b82f6] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                Active Assessment
              </span>
              <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0f172a] mt-2">
                {activeQuiz.title}
              </h4>
            </div>
            <button
              onClick={exitQuiz}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-all border border-slate-250 hover:bg-slate-50 px-3 py-1.5 rounded-full"
            >
              Exit assessment
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 select-none">
            <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-extrabold mb-2">
              <span>Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
              <span>Correct Score: {correctAnswersCount} / {activeQuiz.questions.length}</span>
            </div>
            {/* Custom progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6 select-none">
            <h5 className="font-serif text-[14.5px] sm:text-[15.5px] text-[#0f172a] font-medium leading-relaxed bg-slate-50/55 border border-slate-100 p-4.5 rounded-xl shadow-sm flex gap-3.5 items-start">
              <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span>{activeQuiz.questions[currentQuestionIdx].question}</span>
            </h5>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
              const optLetter = ["A", "B", "C", "D"][idx];
              
              // Formatting styles based on selection state
              let btnClass = "border-slate-200 bg-slate-50/30 text-slate-700 hover:bg-white hover:border-blue-400 hover:shadow-xs";
              let iconElement = null;

              if (selectedOptionIdx === idx) {
                btnClass = "border-[#0f172a] bg-[#0f172a]/5 text-slate-900 font-semibold ring-2 ring-[#0f172a]/20 scale-[1.002]";
              }

              if (isAnswerRevealed) {
                const correctIdx = activeQuiz.questions[currentQuestionIdx].answerIndex;
                if (idx === correctIdx) {
                  btnClass = "border-emerald-500/80 bg-emerald-50/80 text-emerald-900 font-bold shadow-xs";
                  iconElement = <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />;
                } else if (selectedOptionIdx === idx) {
                  btnClass = "border-rose-400 bg-rose-50/50 text-rose-900 line-through decoration-rose-500/20";
                  iconElement = <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
                } else {
                  btnClass = "border-slate-100 bg-slate-50/10 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerRevealed}
                  onClick={() => selectOption(idx)}
                  className={`w-full text-left p-4 border text-xs sm:text-sm rounded-lg transition-all flex justify-between items-center font-sans ${btnClass} ${
                    isAnswerRevealed ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div className="flex gap-3.5 pr-2 items-center">
                    <span className="w-5.5 h-5.5 flex items-center justify-center font-bold bg-slate-200/50 text-slate-600 rounded-full text-[10px] uppercase shrink-0 font-sans">
                      {optLetter}
                    </span>
                    <span className="leading-normal font-medium">{option}</span>
                  </div>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Confirm or Explanation Review Box */}
          <div className="space-y-4">
            {!isAnswerRevealed ? (
              <button
                type="button"
                disabled={selectedOptionIdx === null}
                onClick={revealAnswer}
                className="w-full text-center py-3 bg-[#0f172a] text-white hover:bg-[#334155] hover:shadow-md transition-all text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
              >
                Submit Response
              </button>
            ) : (
              <div className="space-y-4.5">
                {/* Explanation review detail */}
                <div className="p-4.5 bg-blue-50/40 border border-blue-100 rounded-xl select-none">
                  <h6 className="text-[10px] uppercase font-extrabold text-blue-800 mb-1.5 pl-0.5 tracking-wider font-sans flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Socratic Lesson Insight:
                  </h6>
                  <p className="text-xs font-serif leading-relaxed text-slate-700">
                    {activeQuiz.questions[currentQuestionIdx].explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={nextQuestion}
                  className="w-full text-center py-3 bg-[#0f172a] hover:bg-slate-800 text-white transition-all text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:shadow-md"
                >
                  <span>{currentQuestionIdx + 1 === activeQuiz.questions.length ? "Finish Assessment" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUIZ FINISHED COMPLETED SCREEN */}
      {activeQuiz && quizFinished && (
        <div className="border border-slate-200/50 p-8 sm:p-10 bg-white rounded-xl text-center max-w-lg mx-auto shadow-inner relative overflow-hidden">
          {/* Subtle success background bursts */}
          <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl" />

          <Award className="w-14 h-14 text-indigo-600 mx-auto mb-4 animate-bounce" />
          <h4 className="font-serif font-bold text-2xl sm:text-3.5xl leading-tight text-[#0f172a] mb-2.5">
            Assessment Completed
          </h4>
          <p className="text-[9.5px] text-slate-400 uppercase tracking-widest font-extrabold mb-6 select-none font-sans bg-slate-50 border border-slate-200 px-3 py-1 rounded-full w-fit mx-auto">
            Diagnostic: {activeQuiz.title}
          </p>

          {/* Score display unit */}
          <div className="w-32 h-32 rounded-full ring-4 ring-[#0f172a]/5 flex flex-col justify-center items-center bg-gradient-to-tr from-slate-50 via-white to-sky-50 mx-auto mb-7 shadow-lg select-none relative">
            <span className="text-4xl font-extrabold text-[#0f172a] leading-none drop-shadow-sm">
              {correctAnswersCount}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-extrabold mt-1.5">
              of {activeQuiz.questions.length} correct
            </span>
          </div>

          {/* Feedback Message */}
          <p className="text-xs sm:text-[13px] font-serif leading-relaxed text-slate-600 mb-7 italic select-none max-w-sm mx-auto">
            {correctAnswersCount === activeQuiz.questions.length
              ? "Magnificent! You have mastered these conceptual framework pillars. Your analytical precision is fully prepared for upper division seminars."
              : correctAnswersCount >= 3
              ? "Good effort! You hold a strong foundation. Revise the corresponding Google NotebookLMs and pose Socratic questions to sharpen any remaining logical gates."
              : "A valuable diagnostic lesson! Philosophy is learned by revision and dialogue. Engage with Prof. Leon's Socratic chatbot tutor in any syllabus course and test again."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={exitQuiz}
              className="flex-1 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all"
            >
              Back to Menu
            </button>
            <button
              onClick={resetActiveQuiz}
              className="flex-1 py-2.5 bg-[#0f172a] text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 hover:shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
              Retry Unit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
