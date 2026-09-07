/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Course } from "./types";
import { COURSES_DATA, READING_GROUPS_DATA } from "./data/courses";
import Ticker from "./components/Ticker";
import ReadingHub from "./components/ReadingHub";
import CourseModal from "./components/CourseModal";
import QuizSection from "./components/QuizSection";
import { motion } from "motion/react";
import { 
  GraduationCap, 
  ExternalLink, 
  ChevronRight, 
  Video, 
  Volume2, 
  Presentation, 
  FileText, 
  CheckSquare, 
  Layers2, 
  ArrowUp,
  Compass,
  BookOpen,
  Sparkles
} from "lucide-react";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All Subjects", value: "all" },
    { label: "Ethics", value: "ethics" },
    { label: "Logic & Reasoning", value: "logic" },
    { label: "History of Philosophy", value: "history" },
    { label: "Political", value: "political" },
    { label: "Metaphysics & Mind", value: "metaphysics" },
    { label: "Honors Core", value: "honors" }
  ];

  const filteredCourses = COURSES_DATA.filter(course => {
    if (activeFilter === "all") return true;
    return course.categoryTags.includes(activeFilter);
  });

  const openCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-tr from-[#f4f7fa] via-[#fbfcfd] to-[#e9f0f6] text-[#0f172a] min-h-screen font-sans antialiased selection:bg-[#3b82f6] selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Decorative Shimmering Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-[40%] right-[-100px] w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* HEADER SECTION - Academic Prestige banner */}
      <header className="border-b border-slate-200/80 px-6 sm:px-10 py-7 flex justify-between items-center gap-5 bg-white/70 backdrop-blur-md select-none sticky top-0 z-30 shadow-sm shadow-slate-100/40">
        <div className="flex items-center gap-4">
          {/* Circular Badge Ring Emblem */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1e293b] to-[#0f172a] flex items-center justify-center p-0.5 shadow-md shadow-indigo-900/10 shrink-0">
            <div className="w-full h-full rounded-full border border-slate-500/30 flex items-center justify-center bg-[#1e293b] text-white">
              <span className="font-serif italic text-lg font-bold">Φ</span>
            </div>
          </div>
          <div>
            <h1 className="font-serif font-semibold text-2xl sm:text-3.5xl tracking-tight leading-none text-[#0f172a] drop-shadow-sm">
              Philosophy Portal
            </h1>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#64748b] font-semibold mt-1">
              El Camino College · Department of Philosophy
            </p>
          </div>
        </div>

        {/* Dynamic Badge Button linking profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">Academic Center</span>
            <span className="text-xs font-serif italic text-[#334155] font-semibold">Prof. Felipe Leon</span>
          </div>
          <a
            href="https://sites.google.com/view/felipeleon/home"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all shadow-sm group"
            title="View Professor Profile"
          >
            <Compass className="w-4.5 h-4.5 group-hover:rotate-18 key-spin transition-all" />
          </a>
        </div>
      </header>

      {/* TWO-COLUMN LAYOUT FRAME */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_auto] min-h-[calc(100vh-120px)] relative">
        
        {/* LEFT VERTICAL LABEL STRIP */}
        <aside className="hidden h-full md:flex w-10 border-r border-slate-200/60 justify-center py-8 select-none bg-white/40">
          <div className="rotate-275 text-[8px] tracking-[0.25em] uppercase font-extrabold text-slate-400 whitespace-nowrap h-fit">
            El Camino College &nbsp;·&nbsp; Fall &amp; Spring Term Curriculum
          </div>
        </aside>

        {/* MAIN BODY SCROLLED AREA */}
        <main id="main-content" className="flex flex-col min-w-0">
          
          {/* NAVIGATION ACCENTS */}
          <nav className="border-b border-slate-200/60 px-6 sm:px-10 py-3.5 flex gap-4 sm:gap-8 flex-wrap text-xs tracking-wider uppercase font-extrabold text-[#64748b] bg-white/45 select-none">
            <a href="#courses" className="hover:text-blue-600 hover:underline underline-offset-4 transition-colors flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 opacity-70" />
              Official Courses
            </a>
            <a href="#reading-groups" className="hover:text-blue-600 hover:underline underline-offset-4 transition-colors">
              Reading Groups
            </a>
            <a href="#self-study" className="hover:text-blue-600 hover:underline underline-offset-4 transition-colors font-bold text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Socratic Self-Study
            </a>
          </nav>

          {/* SATELLITE HERO BANNER */}
          <section className="px-6 sm:px-10 py-14 md:py-20 border-b border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white/80 via-white/40 to-transparent relative select-none">
            <div className="space-y-5">
              <span className="text-[10px] tracking-[0.2em] font-extrabold text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit">
                Explore philosophy together
              </span>
              <h2 className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-6.5xl leading-[1.05] tracking-tight text-[#0f172a]">
                Think <span className="italic font-medium text-[#1e3a8a]">Deeply</span>.<br />
                Argue <span className="italic font-medium text-[#1e3a8a]">Well</span>.<br />
                Live <span className="italic font-medium text-[#1e3a8a]">Examined</span>.
              </h2>
              <p className="text-sm md:text-base font-serif leading-relaxed text-[#475569] max-w-lg">
                Explore philosophy through courses, reading groups, and practice questions. Start with our philosophy of physics and science reading group, or browse the subjects below.
              </p>
            </div>

            {/* Glossy Modern Globe composition representing pristine academia */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <a href="#reading-groups" className="w-full max-w-md rounded-2xl bg-slate-900 text-white p-7 shadow-lg hover:bg-blue-950 transition-colors">
                <span className="text-sm font-semibold tracking-widest uppercase text-blue-200">Our reading group</span>
                <span className="block font-serif text-3xl sm:text-4xl mt-3 leading-tight">Physics, science<br />& the nature of reality</span>
                <span className="block mt-4 text-base leading-relaxed text-slate-200">Maudlin · Lewis · Godfrey-Smith</span>
                <span className="block mt-5 text-base font-semibold">Explore the readings →</span>
              </a>

              <a 
                href="https://sites.google.com/view/felipeleon/home" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-md bg-white hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] px-5 py-3 transition-all rounded-full group"
              >
                <span>Professor Research & Publications</span> 
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* INFINITE COMPACT MARQUEE */}
          <Ticker />

          <ReadingHub />

          {/* SECTION: ACADEMIC COURSE GRID CATALOG */}
          <section id="courses" className="scroll-mt-12 select-none">
            {/* Elegant Section Title Ribbon */}
            <div className="px-6 sm:px-10 py-5 bg-white border-b border-slate-200/70 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-600 block mb-0.5">Academic Curriculum</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0f172a]">
                  Official Courses Overview
                </h3>
              </div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                {COURSES_DATA.length} Course Descriptions
              </span>
            </div>

            {/* Sub-discipline Course Filters - modern pills */}
            <div className="px-6 sm:px-10 py-4 bg-slate-50/50 border-b border-slate-200/50 flex gap-2 flex-wrap items-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mr-2">Filter Topics:</span>
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-1.5 text-[11px] uppercase font-bold tracking-wider rounded-full border cursor-pointer transition-all duration-250 ${
                    activeFilter === filter.value
                      ? "bg-[#0f172a] text-white border-[#0f172a] shadow-md shadow-slate-900/10"
                      : "bg-white text-[#64748b] border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Responsive Grid Catalog using glossy styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-slate-200/50 gap-[1px] border-b border-slate-200">
              {filteredCourses.map((course, idx) => (
                <motion.button
                  key={course.id}
                  onClick={() => openCourseDetail(course)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="p-6 bg-white hover:bg-gradient-to-br hover:from-white hover:via-[#fcfdfd] hover:to-[#eff6ff] text-left transition-all group flex flex-col justify-between min-h-[196px] cursor-pointer relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]"
                >
                  {/* Subtle hover accent light bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-slate-400 group-hover:text-blue-600 transition-colors mb-2 block">
                      {course.num}
                    </span>
                    <h4 className="font-serif font-bold text-xl leading-snug group-hover:text-indigo-950 text-[#0f172a] mb-2.5">
                      {course.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#64748b] group-hover:text-[#475569] line-clamp-3">
                      {course.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-between items-center text-[10px] uppercase tracking-wider font-extrabold">
                    <span className="text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full group-hover:border-blue-200 group-hover:bg-blue-50/50 group-hover:text-blue-700 transition-all">
                      {course.tag}
                    </span>
                    <span className="text-blue-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all duration-200 opacity-60 group-hover:opacity-100">
                      Explore Course →
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* SECTION: ACADEMIC READING SEMINAR GROUPS */}
          <section id="further-reading" className="scroll-mt-12">
            <div className="px-6 sm:px-10 py-5 bg-white border-b border-slate-200/70 flex justify-between items-center bg-white">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-600 block mb-0.5">Extracurricular</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0f172a]">
                  Further Reading Interests
                </h3>
              </div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                Future topics
              </span>
            </div>

            {/* Three-column glass accent boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-200/50 gap-[1px] border-b border-slate-200">
              {READING_GROUPS_DATA.filter(gp => gp.index !== "01").map((gp, idx) => (
                <div 
                  key={idx} 
                  className="p-7 bg-white hover:bg-gradient-to-b hover:from-white hover:to-[#fafbfe] transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="font-serif italic text-4xl text-slate-200 group-hover:text-blue-200 leading-none block font-semibold">
                      {gp.index}
                    </span>
                    <h4 className="font-serif font-bold text-xl text-[#0f172a] leading-snug">
                      {gp.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#64748b] font-serif">
                      {gp.desc}
                    </p>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#0f172a] border-t border-slate-100 mt-6 pt-4 flex items-start gap-2 select-none">
                    <span className="shrink-0 text-xs">📓</span>
                    <span className="leading-relaxed text-[#64748b] font-semibold">Reading plans and materials to follow.</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: UNOFFICIAL SELF-STUDY & INTERACTIVE ASSESSMENT */}
          <section id="self-study" className="scroll-mt-12">
            <div className="px-6 sm:px-10 py-5 bg-white border-b border-slate-200/70 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#3b82f6] block mb-0.5">Socratic Workspace</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0f172a]">
                  Unofficial Self-Study Courses
                </h3>
              </div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                Interactive Companion Environment
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 border-b border-slate-200">
              
              {/* Left Column: Socratic Mission Blurb */}
              <div className="p-6 sm:p-10 space-y-6 bg-slate-50/30">
                <div className="space-y-4 select-none">
                  <h4 className="font-serif font-bold text-3xl sm:text-4.5xl leading-tight text-[#0f172a]">
                    Philosophy <span className="italic text-[#1e3a8a] font-normal">Beyond</span> the Classroom
                  </h4>
                  <p className="text-xs sm:text-sm font-serif leading-relaxed text-[#475569]">
                    Use these optional resources to revisit a difficult idea, try a practice quiz, or explore a topic beyond your coursework.
                  </p>
                  <p className="text-xs sm:text-sm font-serif leading-relaxed text-[#475569]">
                    Reading-group materials will be added as they become available. The AI tutor and generated quizzes offer additional practice; compare their responses with the assigned texts.
                  </p>
                  <div className="pt-2">
                    <a 
                      href="https://sites.google.com/view/felipeleon/home" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-sm bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 px-5 py-3 transition-all rounded-full"
                    >
                      Explore Research Notebooks & Essays <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Grid list of resources with actual Lucide Icon matches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200/60 select-none">
                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <Video className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">Video Seminars</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Comprehensive conceptual whiteboards</span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <Volume2 className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">Academic Podcasts</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Structured debates and concept bites</span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <Presentation className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">Lecture Decks</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Logical maps and diagram projections</span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <FileText className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">Briefing Papers</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Logical summaries of classical texts</span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <CheckSquare className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">Self-Assessments</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Diagnostic reviews with AI feedback loops</span>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-2.5 rounded-xl bg-white/40 hover:bg-white border border-transparent hover:border-white/80 hover:shadow-sm transition-all">
                    <Layers2 className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <strong className="text-xs uppercase tracking-wider font-extrabold block text-slate-800">NotebookLM Portals</strong>
                      <span className="text-[10px] text-slate-500 leading-snug block font-medium">Pre-curated Google Notebook workspaces</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Interactive Quiz Assessment Engine */}
              <div className="bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col justify-center">
                <QuizSection />
              </div>

            </div>
          </section>
        </main>

        {/* RIGHT CLICKABLE NAVIGATION SCROLL COLUMN */}
        <aside 
          onClick={scrollToTop} 
          role="button"
          tabIndex={0}
          onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); scrollToTop(); } }}
          aria-label="Scroll back to top of course page"
          className="hidden md:flex w-10 border-l border-slate-200/60 justify-center py-8 cursor-pointer select-none bg-white hover:bg-blue-600 hover:text-white text-slate-400 transition-all focus:ring-1 focus:ring-blue-400"
        >
          <div className="rotate-90 select-none text-[8px] tracking-[0.25em] uppercase font-extrabold flex items-center gap-2 h-fit whitespace-nowrap">
            Scroll to Top <ArrowUp className="w-3.5 h-3.5 -rotate-90 shrink-0" />
          </div>
        </aside>
      </div>

      {/* DETAILED DIALOG MODAL INJECTS SOCRATIC AI CHATBOT */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />

      {/* COMPREHENSIVE PLATFORM FOOTER */}
      <footer className="px-6 sm:px-10 py-6 border-t border-slate-200/70 bg-white text-[10px] uppercase font-bold tracking-widest text-[#64748b] select-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sans shadow-inner">
        <span>Prof. Felipe Leon &nbsp;·&nbsp; El Camino College &nbsp;·&nbsp; Torrance, CA 90506</span>
        <span>
          <a href="https://sites.google.com/view/felipeleon/home" target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline underline-offset-2 transition-all">
            Professor Profile ↗
          </a>
          &nbsp;·&nbsp; Department of Philosophy
        </span>
      </footer>
    </div>
  );
}
