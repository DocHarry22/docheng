import {
  Brain,
  FileText,
  UserCheck,
  Compass,
  GraduationCap,
  FlaskConical,
  Calculator,
  Briefcase,
  BarChart3,
  PenTool,
  Network,
  Cog,
  type LucideIcon,
} from "lucide-react";

export type ProductStatus = "live" | "beta" | "development" | "coming-soon" | "vision";
export type ProductCategory =
  | "all"
  | "student"
  | "career"
  | "ai-tools"
  | "productivity"
  | "engineering";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: ProductStatus;
  categories: ProductCategory[];
  icon: LucideIcon;
  gradient: string;
  url?: string;
}

export const products: Product[] = [
  {
    id: "desk",
    name: "DoCHEng Desk",
    shortName: "Desk",
    description:
      "AI workspace for knowledge management, research synthesis, and deep-work productivity.",
    status: "live",
    categories: ["productivity", "ai-tools"],
    icon: Brain,
    gradient: "from-blue-500 to-cyan-400",
    url: "/desk",
  },
  {
    id: "chatpdf",
    name: "DoCHEng ChatPDF",
    shortName: "ChatPDF",
    description:
      "Converse with documents. Extract insights, summarize content, and interact with PDFs using AI.",
    status: "live",
    categories: ["ai-tools", "student"],
    icon: FileText,
    gradient: "from-violet-500 to-purple-400",
    url: "/chatpdf",
  },
  {
    id: "resume-parser",
    name: "DoCHEng Resume Parser",
    shortName: "Resume Parser",
    description:
      "Structured CV extraction, career insights, and intelligent job-fit analysis.",
    status: "beta",
    categories: ["career"],
    icon: UserCheck,
    gradient: "from-amber-500 to-orange-400",
    url: "/resume-parser",
  },
  {
    id: "course-compass",
    name: "DoCHEng Course Compass",
    shortName: "Course Compass",
    description:
      "Academic planning intelligence — APS guidance, programme navigation, and study path optimization.",
    status: "development",
    categories: ["student"],
    icon: Compass,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    id: "student-app",
    name: "DoCHEng Student App",
    shortName: "Student App",
    description:
      "A unified student support ecosystem — academic tools, learning aids, productivity, and career readiness.",
    status: "development",
    categories: ["student"],
    icon: GraduationCap,
    gradient: "from-pink-500 to-rose-400",
  },
  {
    id: "research-assistant",
    name: "AI Research Assistant",
    shortName: "Research AI",
    description:
      "Smart research companion for literature review, citation management, and knowledge synthesis.",
    status: "coming-soon",
    categories: ["ai-tools", "student"],
    icon: FlaskConical,
    gradient: "from-sky-500 to-blue-400",
  },
  {
    id: "engineering-calc",
    name: "Engineering Calculator Suite",
    shortName: "Eng Calc",
    description:
      "Technical calculators and simulation tools for chemical, mechanical, and process engineering.",
    status: "coming-soon",
    categories: ["engineering"],
    icon: Calculator,
    gradient: "from-orange-500 to-red-400",
  },
  {
    id: "career-intelligence",
    name: "Career Intelligence Platform",
    shortName: "Career Intel",
    description:
      "Career analytics, market trends, skill-gap analysis, and intelligent job matching.",
    status: "vision",
    categories: ["career", "ai-tools"],
    icon: Briefcase,
    gradient: "from-indigo-500 to-violet-400",
  },
  {
    id: "learning-analytics",
    name: "Learning Analytics Dashboard",
    shortName: "Learn Analytics",
    description:
      "Study performance insights, learning pattern recognition, and academic progress intelligence.",
    status: "vision",
    categories: ["student"],
    icon: BarChart3,
    gradient: "from-teal-500 to-emerald-400",
  },
  {
    id: "technical-writing",
    name: "Technical Writing Suite",
    shortName: "Tech Writing",
    description:
      "AI-assisted report generation, lab documentation, and professional technical writing tools.",
    status: "vision",
    categories: ["productivity", "engineering"],
    icon: PenTool,
    gradient: "from-fuchsia-500 to-pink-400",
  },
  {
    id: "study-graph",
    name: "Study Graph System",
    shortName: "Study Graph",
    description:
      "Knowledge mapping, concept linking, and visual study networks for deeper understanding.",
    status: "vision",
    categories: ["ai-tools", "student"],
    icon: Network,
    gradient: "from-cyan-500 to-sky-400",
  },
  {
    id: "doc-automation",
    name: "Document Automation",
    shortName: "Doc Auto",
    description:
      "Workflow-driven document generation, templates, and intelligent formatting pipelines.",
    status: "vision",
    categories: ["productivity"],
    icon: Cog,
    gradient: "from-slate-400 to-zinc-300",
  },
];

export const statusConfig: Record<
  ProductStatus,
  { label: string; color: string; bg: string }
> = {
  live: { label: "Live", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  beta: {
    label: "Beta",
    color: "text-amber-300",
    bg: "bg-amber-300/10 border-amber-300/20",
  },
  development: {
    label: "In Development",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  "coming-soon": {
    label: "Coming Soon",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20",
  },
  vision: { label: "Vision", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
};

export function getProductCTA(product: Product): { label: string; href: string } {
  switch (product.status) {
    case "live":
      return { label: "Open App", href: product.url || "#" };
    case "beta":
      return { label: "Join Beta", href: product.url || "#cta" };
    case "development":
      return { label: "Join Waitlist", href: "#cta" };
    case "coming-soon":
      return { label: "Notify Me", href: "#cta" };
    case "vision":
      return { label: "Learn More", href: "#roadmap" };
  }
}

export const categoryLabels: Record<ProductCategory, string> = {
  all: "All Products",
  student: "Student",
  career: "Career",
  "ai-tools": "AI Tools",
  productivity: "Productivity",
  engineering: "Engineering",
};

export const ecosystemConnections = [
  { from: "desk", to: "chatpdf", label: "Document intelligence" },
  { from: "chatpdf", to: "research-assistant", label: "Research pipeline" },
  { from: "desk", to: "technical-writing", label: "Content creation" },
  { from: "resume-parser", to: "career-intelligence", label: "Career data" },
  { from: "course-compass", to: "student-app", label: "Academic planning" },
  { from: "student-app", to: "learning-analytics", label: "Study insights" },
  { from: "study-graph", to: "desk", label: "Knowledge mapping" },
  { from: "doc-automation", to: "technical-writing", label: "Workflow automation" },
  { from: "engineering-calc", to: "desk", label: "Technical computation" },
];

export const roadmapPillars = [
  {
    id: "knowledge",
    title: "Knowledge Intelligence",
    description:
      "Systems that understand, organize, and surface knowledge when you need it most.",
    products: ["desk", "chatpdf", "study-graph"],
    icon: Brain,
    color: "from-blue-500 to-cyan-400",
    phase: "Now → 2027",
  },
  {
    id: "academic",
    title: "Academic Systems",
    description:
      "End-to-end academic support — from course selection to graduation-ready intelligence.",
    products: ["course-compass", "student-app", "learning-analytics"],
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-400",
    phase: "2026 → 2028",
  },
  {
    id: "career",
    title: "Career Systems",
    description:
      "Career intelligence that bridges education and industry with data-driven guidance.",
    products: ["resume-parser", "career-intelligence"],
    icon: Briefcase,
    color: "from-amber-500 to-orange-400",
    phase: "Now → 2027",
  },
  {
    id: "engineering",
    title: "Engineering Tools",
    description:
      "Precision tools for technical computation, documentation, and engineering workflows.",
    products: ["engineering-calc", "technical-writing", "doc-automation"],
    icon: Calculator,
    color: "from-violet-500 to-purple-400",
    phase: "2027 → 2029",
  },
  {
    id: "ai-infra",
    title: "AI Infrastructure",
    description:
      "The intelligence layer that connects all DoCHEng products through shared AI capabilities.",
    products: ["research-assistant", "doc-automation", "study-graph"],
    icon: Network,
    color: "from-pink-500 to-rose-400",
    phase: "Ongoing",
  },
];
