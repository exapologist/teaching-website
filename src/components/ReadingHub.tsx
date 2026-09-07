import { BookOpen, ExternalLink, FileText, Presentation, Video, Volume2, CheckSquare } from "lucide-react";
import content from "../data/readingGroup.json";

type ResourceKind = "video" | "audio" | "slides" | "notes" | "briefing" | "quiz";
type Resource = { title: string; kind: ResourceKind; url: string };
type Session = {
  id: string; stage: string; title: string; author: string; book: string;
  assignment: string; description: string; readingUrl: string; notebookUrl: string;
  resources: Resource[]; questions: string[];
};
const kinds = {
  video: { label: "Video", icon: Video },
  audio: { label: "Audio", icon: Volume2 },
  slides: { label: "Slides", icon: Presentation },
  notes: { label: "Notes", icon: FileText },
  briefing: { label: "Briefing document", icon: FileText },
  quiz: { label: "Practice quiz", icon: CheckSquare },
};

// Only publish web links or root-relative paths to uploaded static resources.
export function resourceUrl(value: string): string | undefined {
  if (!value || /[\s\\]/.test(value)) return undefined;
  if (/^\/(?!\/)/.test(value)) return value;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

function ResourceLinks({ resources }: { resources: Resource[] }) {
  const available = resources.filter(resource => kinds[resource.kind] && resourceUrl(resource.url));
  if (!available.length) return <p className="text-slate-600 leading-relaxed">Individual videos, slides, notes, briefing documents, and practice quizzes will appear here as they are added. Use the companion notebook below to explore the shared materials.</p>;
  return <ul className="grid sm:grid-cols-2 gap-3">
    {available.map((resource, index) => {
      const { icon: Icon, label } = kinds[resource.kind];
      return <li key={`${resource.url}-${index}`}>
        <a className="resource-link flex gap-3 items-start rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-600 hover:bg-blue-50 transition-colors h-full" href={resourceUrl(resource.url)} target="_blank" rel="noopener noreferrer">
          <Icon aria-hidden="true" className="w-5 h-5 text-blue-700 shrink-0 mt-1" />
          <span className="min-w-0 flex-1"><span className="block text-sm text-slate-600">{label}</span><span className="font-semibold break-words">{resource.title}</span></span>
          <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0 text-slate-500 mt-1" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>;
    })}
  </ul>;
}

export default function ReadingHub() {
  const sessions = content.sessions as Session[];
  return <section id="reading-groups" className="reading-hub border-b border-slate-200 bg-slate-50/70" aria-labelledby="reading-title">
    <div className="px-6 sm:px-10 pt-10 pb-7 border-b border-slate-200 bg-white">
      <p className="text-sm font-semibold tracking-widest uppercase text-blue-700 mb-2">Reading group</p>
      <h2 id="reading-title" className="font-serif text-4xl sm:text-5xl font-semibold leading-tight">{content.title}</h2>
      <p className="max-w-3xl mt-4 text-base leading-relaxed text-slate-700">{content.intro}</p>
      <p className="mt-3 text-sm text-slate-600">{content.meetingNote}</p>
      {resourceUrl(content.meetingUrl) && <a className="inline-block mt-3 text-blue-700 underline underline-offset-4" href={resourceUrl(content.meetingUrl)} target="_blank" rel="noopener noreferrer">{content.meetingLabel} <span className="sr-only">(opens in a new tab)</span></a>}
      <nav aria-label="Reading group books" className="grid lg:grid-cols-3 gap-3 mt-7">
        {sessions.map((session, index) => <a key={session.id} href={`#${session.id}`} className="rounded-xl border border-slate-200 p-4 hover:border-blue-600 hover:bg-blue-50 transition-colors">
          <span className="text-sm text-blue-700 font-semibold">{index === 0 ? "Begin with Maudlin" : index === 1 ? "Then read Lewis" : "Read Godfrey-Smith alongside"}</span>
          <span className="block font-serif text-2xl leading-tight mt-2">{session.book}</span>
        </a>)}
      </nav>
    </div>
    <div className="px-6 sm:px-10 py-8 space-y-6">
      <div className="border-l-4 border-blue-700 pl-5 max-w-3xl">
        <h3 className="font-semibold text-lg">Prepare for a conversation</h3>
        <p className="mt-2 text-slate-700 leading-relaxed">Read the assigned text first, use the companion materials to review, then bring one question and one argument you want to discuss. The prompts below are starting points for our conversation.</p>
      </div>
      {sessions.map((session, index) => <article id={session.id} key={session.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <p className="text-sm font-semibold text-blue-700 mb-2">{session.stage}</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">{session.title}</h3>
          <p className="mt-3 text-slate-700">{session.author} · <cite>{session.book}</cite></p>
          <p className="mt-2 font-semibold">{session.assignment}</p>
          <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">{session.description}</p>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="font-semibold text-lg flex gap-2 items-center"><BookOpen aria-hidden="true" className="w-5 h-5 text-blue-700" />Read</h4>
            {resourceUrl(session.readingUrl)
              ? <a href={resourceUrl(session.readingUrl)} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-700 underline underline-offset-4">Open reading <span className="sr-only">(opens in a new tab)</span></a>
              : <p className="mt-2 text-slate-600">{index === 0 ? "Use your copy of the book or the reading provided by Prof. Leon." : "The assigned chapters and reading access details will be added here."}</p>}
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Watch, review & check your understanding</h4>
            <ResourceLinks resources={session.resources} />
            {resourceUrl(session.notebookUrl) && <a href={resourceUrl(session.notebookUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 text-blue-700 underline underline-offset-4">Open companion notebook <span className="sr-only">(opens in a new tab)</span></a>}
            {resourceUrl(session.notebookUrl) && <p className="mt-2 text-sm text-slate-600">Google sign-in or access permission may be required. If you cannot open the notebook, let Prof. Leon know.</p>}
          </div>
          <details className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5" open={index === 0}>
            <summary className="cursor-pointer font-semibold text-lg">Discuss · Questions to bring</summary>
            <ol className="mt-4 list-decimal pl-6 space-y-3 text-slate-700 leading-relaxed">
              {session.questions.map(question => <li key={question} className="pl-1">{question}</li>)}
            </ol>
            <p className="mt-4 text-sm text-slate-600">When you respond, identify a passage, reconstruct its reasoning, and consider an objection.</p>
          </details>
        </div>
      </article>)}
    </div>
  </section>;
}
