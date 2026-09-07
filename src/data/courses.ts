/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, ReadingGroup, Quiz } from "../types";

export const COURSES_DATA: Course[] = [
  {
    id: "phil101",
    num: "PHIL 101",
    title: "Introduction to Philosophy",
    desc: "A survey of the fundamental problems of philosophy — knowledge, reality, mind, and the good life.",
    body: "This course surveys the central problems of Western philosophy including the nature of knowledge, the existence of God, the mind-body problem, free will, and the foundations of morality. We read primary texts alongside accessible contemporary philosophy. Ideal for students encountering philosophy for the first time.",
    tag: "3 Units",
    categoryTags: ["metaphysics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil101h",
    num: "PHIL 101H",
    title: "Honors Intro to Philosophy",
    desc: "An accelerated honors section engaging primary texts and advanced seminar-style discussion of core philosophical problems.",
    body: "An honors-level section of PHIL 101 with more rigorous reading expectations, original source texts, and seminar-style class discussion. Students write longer analytical essays and engage in Socratic dialogue. Recommended for those considering philosophy as a major at a four-year university.",
    tag: "Honors · 3 Units",
    categoryTags: ["metaphysics", "honors"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil103",
    num: "PHIL 103",
    title: "Ethics & Society",
    desc: "Examination of ethical theory and its application to contemporary moral and social issues.",
    body: "An examination of the major ethical theories — consequentialism, deontology, virtue ethics, and contractualism — and their application to contemporary social issues including poverty, justice, animal ethics, and environmental responsibility. Practical philosophical reasoning at its core.",
    tag: "Ethics · 3 Units",
    categoryTags: ["ethics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil105",
    num: "PHIL 105",
    title: "Critical Thinking",
    desc: "Principles of reasoning, argument analysis, informal fallacies, and the evaluation of evidence in everyday contexts.",
    body: "Students develop skills in argument identification and analysis, logical validity, informal fallacies, statistical reasoning, and evaluating sources of evidence. Essential for academic success in any discipline. Meets the critical thinking general education requirement.",
    tag: "Logic & Reasoning · 3 Units",
    categoryTags: ["logic"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil106",
    num: "PHIL 106",
    title: "Symbolic Logic",
    desc: "Formal systems of propositional and predicate logic, proofs, and the foundations of mathematical reasoning.",
    body: "An introduction to formal logic: propositional logic, truth tables, natural deduction, predicate logic, and quantificational reasoning. Students who enjoy mathematics and precision will thrive. Excellent preparation for computer science, mathematics, linguistics, and analytic philosophy programs.",
    tag: "Logic · 3 Units",
    categoryTags: ["logic"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil107",
    num: "PHIL 107",
    title: "Philosophy of Religion",
    desc: "Arguments for and against the existence of God, faith and reason, religious experience, and the problem of evil.",
    body: "Critical philosophical analysis of religious belief. Topics include classical arguments for the existence of God (ontological, cosmological, teleological), the problem of evil and suffering, the nature of faith, religious experience, miracles, and the relationship between science and religion.",
    tag: "Metaphysics & Mind · 3 Units",
    categoryTags: ["metaphysics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil111",
    num: "PHIL 111",
    title: "Ancient & Medieval Philosophy",
    desc: "From the Pre-Socratics and Plato through Aristotle to Augustine, Aquinas, and the Scholastics.",
    body: "A chronological survey from the Pre-Socratic cosmologists through Socrates, Plato, and Aristotle, continuing into Hellenistic schools and culminating in Medieval thinkers including Augustine, Avicenna, Averroes, and Thomas Aquinas. Students engage directly with landmark primary texts.",
    tag: "History · 3 Units",
    categoryTags: ["history", "metaphysics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil112",
    num: "PHIL 112",
    title: "Modern Philosophy",
    desc: "Descartes, Locke, Hume, Kant, and the rise of modern epistemology, metaphysics, and moral philosophy.",
    body: "The philosophical revolution of the 17th and 18th centuries. Primary texts from Descartes, Spinoza, Leibniz, Locke, Berkeley, Hume, and Kant. Topics include the rationalism/empiricism debate, the Copernican revolution in epistemology, and the foundations of modern moral and political thought.",
    tag: "History · 3 Units",
    categoryTags: ["history", "metaphysics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil117",
    num: "PHIL 117",
    title: "Political Philosophy",
    desc: "Justice, liberty, democracy, authority, and rights from Hobbes and Rousseau to Rawls and contemporary debate.",
    body: "What justifies political authority? What do we owe each other as citizens? Readings span Hobbes, Locke, Rousseau, Mill, Marx, Rawls, Nozick, and contemporary theorists. Special attention to democracy, social justice, liberty, equality, and the foundations of rights.",
    tag: "Political · 3 Units",
    categoryTags: ["political", "ethics"],
    notebook: "https://notebooklm.google.com/"
  },
  {
    id: "phil374",
    num: "PHIL 374",
    title: "Medical Ethics",
    desc: "Ethical frameworks applied to healthcare — autonomy, informed consent, end-of-life care, resource allocation, and bioethics.",
    body: "Rigorous application of ethical theory to healthcare dilemmas. Topics: informed consent, patient autonomy, resource allocation, end-of-life decisions, physician-assisted dying, reproductive ethics, research ethics, and the ethics of emerging biotechnologies. Recommended for pre-health and nursing students.",
    tag: "Ethics · 3 Units",
    categoryTags: ["ethics"],
    notebook: "https://notebooklm.google.com/"
  }
];

export const READING_GROUPS_DATA: ReadingGroup[] = [
  {
    index: "01",
    title: "Philosophy of Science",
    desc: "Explore the nature of scientific explanation, causation, confirmation, the demarcation problem, and debates over realism and anti-realism. Works by Kuhn, Popper, Lakatos, van Fraassen, and contemporary philosophers of science.",
    format: "📓 Google NotebookLM · Videos · Podcasts · Quizzes · Briefing Docs"
  },
  {
    index: "02",
    title: "Political Philosophy",
    desc: "Deep readings on social contract theory, distributive justice, recognition, power, and democratic legitimacy. Ranging from classical texts to Rawls, Nozick, Habermas, and critical political theory.",
    format: "📓 Google NotebookLM · Videos · Podcasts · Quizzes · Briefing Docs"
  },
  {
    index: "03",
    title: "Feminist Philosophy",
    desc: "Investigating gender, power, standpoint epistemology, care ethics, intersectionality, and feminist critiques of mainstream philosophy. Works by Beauvoir, hooks, Haslanger, Dotson, and Nussbaum.",
    format: "📓 Google NotebookLM · Videos · Podcasts · Quizzes · Briefing Docs"
  }
];

export const DEFAULT_QUIZZES: Quiz[] = [
  {
    id: "ethics-intro",
    title: "Foundations of Ethical Theories",
    topic: "Ethics",
    questions: [
      {
        question: "Which normative ethical perspective holds that actions are morally right solely based on their outcomes or utility?",
        options: [
          "Deontology (Kantianism)",
          "Consequentialism (Utilitarianism)",
          "Virtue Ethics (Aristotelianism)",
          "Social Contract Theory"
        ],
        answerIndex: 1,
        explanation: "Utilitarianism and consequentialism judge the morality of an action entirely by its consequences, aiming to maximize overall happiness or utility ('the greatest good for the greatest number')."
      },
      {
        question: "According to Immanuel Kant, what is a moral duty that must specify rules that can be universally willed for all rational agents?",
        options: [
          "Hypothetical Imperative",
          "Hedonic Calculus",
          "Categorical Imperative",
          "Eudaimonic Maxim"
        ],
        answerIndex: 2,
        explanation: "The Categorical Imperative is Kant's central philosophical concept, denoting an unconditional moral obligation binding in all circumstances, of which the first formulation is the Formula of Universal Law."
      },
      {
        question: "Aristotelian virtue ethics is teleological, meaning it is oriented toward a specific final goal for human existence. What is this goal?",
        options: [
          "Ataraxia (Tranquility)",
          "Eudaimonia (Human flourishing/Well-being)",
          "Hedonism (Sensory pleasure)",
          "Apatheia (Freedom from emotion)"
        ],
        answerIndex: 1,
        explanation: "Aristotle argued that the ultimate end (telos) of human action is Eudaimonia, often translated as active flourishing, well-being, or living in accordance with virtue."
      },
      {
        question: "What ethical concept, prominent in Medical Ethics, refers to a patient's moral right to make self-governing choices about their own medical treatment?",
        options: [
          "Beneficence",
          "Non-maleficence",
          "Justice",
          "Autonomy"
        ],
        answerIndex: 3,
        explanation: "Autonomy is the principle of self-determination, granting individuals custody over their own bodies and certifying informed consent in clinical ethics."
      },
      {
        question: "A critique raised against extreme Utilitarianism is the 'Utility Monster' or the problem of justice. Who formulated this famous critique?",
        options: [
          "Robert Nozick",
          "John Rawls",
          "Immanuel Kant",
          "Thomas Hobbes"
        ],
        answerIndex: 0,
        explanation: "Robert Nozick proposed the 'Utility Monster' in his book 'Anarchy, State, and Utopia' to show that utilitarianism could support extreme exploitation if an entity existed that converted resources to happiness far more efficiently than others."
      }
    ]
  },
  {
    id: "logic-basics",
    title: "Validity, Soundness, & Critical Thinking",
    topic: "Logic & Critical Thinking",
    questions: [
      {
        question: "What constitutes a 'sound' deductive argument in philosophical logic?",
        options: [
          "The conclusions are highly persuasive to an emotional audience.",
          "The argument is valid and all of its premises are actually true.",
          "The argument is valid, regardless of whether premises are true or false.",
          "The premises are true, regardless of the structural connection."
        ],
        answerIndex: 1,
        explanation: "In logic, a deductive argument is sound if and only if it is structurally valid AND all of its premises are empirically or analytically true in reality."
      },
      {
        question: "If an argument's structure is such that it is impossible for the premises to be true and the conclusion simultaneously false, the argument is:",
        options: [
          "Sound",
          "Cogent",
          "Valid",
          "Consistent"
        ],
        answerIndex: 2,
        explanation: "This is the formal definition of deductive 'validity'. It is purely structural: truth of the premises strictly guarantees the truth of the conclusion."
      },
      {
        question: "What informal logical fallacy is committed when someone attacks their opponent's personal character rather than addressing the substance of their logical arguments?",
        options: [
          "Straw Man",
          "Ad Hominem",
          "Begging the Question",
          "Appeal to Ignorance"
        ],
        answerIndex: 1,
        explanation: "An 'Ad Hominem' (Latin: 'to the person') fallacy occurs when a claim is put down or attacked based on the speaker's personal background, character, or circumstances rather than the argument itself."
      },
      {
        question: "Consider the argument: 'If it rains, the grass is wet. The grass is wet. Therefore, it rained.' What formal logical fallacy is this?",
        options: [
          "Affirming the Consequent",
          "Denying the Antecedent",
          "Modus Ponens",
          "Modus Tollens"
        ],
        answerIndex: 0,
        explanation: "This is a classic fallacy of Affirming the Consequent (If P then Q; Q; therefore P). The grass could be wet for other reasons, such as a sprinkler, making the inference invalid."
      },
      {
        question: "A truth-functional connective represented by the symbol '→' or '⊃' represents which logical operator?",
        options: [
          "Disjunction (OR)",
          "Conjunction (AND)",
          "Negation (NOT)",
          "Material Implication (If... then...)"
        ],
        answerIndex: 3,
        explanation: "The arrow '→' or horseshoe '⊃' represents the conditional, or material implication: representing 'If P, then Q'."
      }
    ]
  }
];
