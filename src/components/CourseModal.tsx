/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Course } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, BookmarkCheck, GraduationCap, MessagesSquare } from "lucide-react";
import SocraticCompanion from "./SocraticCompanion";

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  const [activeTab, setActiveTab] = useState<"syllabus" | "socratic">("syllabus");

  // Keep focus and handle escape key close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Reset active tab on change
    setActiveTab("syllabus");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, course, onClose]);

  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
          {/* Overlay background with high-end cinematic blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090d16]/80 backdrop-blur-[6px]"
          />

          {/* Modal content body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-indigo-950/15 overflow-hidden z-10 flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-course-title"
          >
            {/* Close button with circular layout */}
            <button
              onClick={onClose}
              aria-label="Close Course Detail Modal"
              className="absolute top-5 right-5 p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 shadow-xs hover:border-slate-300 transition-all cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header Panel */}
            <div className="p-6 sm:p-8 pb-4 bg-slate-50/50 border-b border-slate-200/50 select-none">
              <span className="text-[10px] tracking-[0.18em] font-extrabold text-blue-600 uppercase block mb-1">
                {course.tag}
              </span>
              <h2
                id="modal-course-title"
                className="font-serif font-bold text-2xl sm:text-3xl text-[#0f172a] leading-tight"
              >
                {course.num} · {course.title}
              </h2>

              {/* Navigation Tabs - Modern pill border designs */}
              <div className="flex gap-2 mt-5 border-b border-slate-200/50 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("syllabus")}
                  className={`px-4 py-2 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all flex items-center gap-1.5 cursor-pointer -mb-[1px] font-sans ${
                    activeTab === "syllabus"
                      ? "border-blue-600 text-blue-600 font-extrabold"
                      : "border-transparent bg-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Syllabus Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("socratic")}
                  className={`px-4 py-2 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all flex items-center gap-1.5 cursor-pointer -mb-[1px] font-sans ${
                    activeTab === "socratic"
                      ? "border-blue-600 text-blue-600 font-extrabold"
                      : "border-transparent bg-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <MessagesSquare className="w-4 h-4" />
                  Socratic Seminar Tutor
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 max-h-[50vh] bg-white">
              {activeTab === "syllabus" ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] tracking-[0.16em] uppercase font-extrabold text-slate-400 mb-2 select-none font-sans">
                      Course Description
                    </h4>
                    <p className="text-[14.5px] font-serif leading-relaxed text-slate-700">
                      {course.body}
                    </p>
                  </div>

                  {/* Syllabus outcomes */}
                  <div className="p-5 bg-slate-50/70 border border-slate-200/70 rounded-xl select-none">
                    <h5 className="text-[10px] tracking-[0.16em] uppercase font-extrabold text-[#0f172a] mb-3.5 flex items-center gap-2 font-sans">
                      <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                      Syllabus Learning Objectives
                    </h5>
                    <ul className="text-[12.5px] font-sans space-y-2.5 text-slate-600 pl-0">
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">I.</span>
                        Understand, analyze, and formulate logical counterarguments for historical philosophies.
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">II.</span>
                        Employ categorical syllogisms, propositional logic, or inductive probability safely.
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">III.</span>
                        Evaluate complex metaethical challenges in contemporary and historical societies.
                      </li>
                    </ul>
                  </div>

                  {/* Actions / Links */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 select-none">
                    <a
                      href={course.notebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 text-xs uppercase font-extrabold tracking-wider border border-blue-600 shadow-md shadow-blue-500/10 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white transition-all rounded-xl font-sans text-center"
                    >
                      {course.notebook === "https://notebooklm.google.com/" ? "Open NotebookLM (course notebook not yet linked)" : "Open course notebook"}
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-sans text-slate-500 text-center select-none leading-relaxed font-semibold max-w-md mx-auto">
                    Pose any conceptual question based on <strong className="text-slate-800 font-bold">{course.num}</strong>. 
                    An AI study companion will ask questions and help you explore the topic. Its responses are not messages from Prof. Leon.
                  </p>
                  <SocraticCompanion course={course} />
                </div>
              )}
            </div>

            {/* Modal Footer Panel */}
            <div className="px-6 py-4.5 border-t border-slate-100 bg-slate-50 text-[10px] uppercase tracking-widest font-extrabold text-slate-400 flex justify-between items-center select-none font-sans">
              <span>El Camino College · Dept of Philosophy</span>
              <span>Semester Catalog: Fall / Spring</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
