export interface EcoNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  color: string;
  category: string;
}

export interface EcoConnection {
  from: string;
  to: string;
  label: string;
  dataFlow: string;
}

export const ecoNodes: EcoNode[] = [
  {
    id: "core",
    label: "DoCHEng\nCore AI",
    description: "Central AI backbone powering all products with shared intelligence.",
    x: 50,
    y: 50,
    color: "#F59E0B",
    category: "Infrastructure",
  },
  {
    id: "desk",
    label: "Desk",
    description: "AI workspace for knowledge management and deep-work productivity.",
    x: 50,
    y: 18,
    color: "#3B82F6",
    category: "Productivity",
  },
  {
    id: "chatpdf",
    label: "ChatPDF",
    description: "Converse with documents using AI-powered intelligence.",
    x: 22,
    y: 35,
    color: "#8B5CF6",
    category: "AI Tools",
  },
  {
    id: "resume",
    label: "Resume\nParser",
    description: "Structured CV extraction and intelligent job-fit analysis.",
    x: 78,
    y: 35,
    color: "#F59E0B",
    category: "Career",
  },
  {
    id: "compass",
    label: "Course\nCompass",
    description: "Academic planning intelligence and programme navigation.",
    x: 15,
    y: 65,
    color: "#10B981",
    category: "Student",
  },
  {
    id: "student",
    label: "Student\nApp",
    description: "Unified student support with academic tools and learning aids.",
    x: 38,
    y: 75,
    color: "#EC4899",
    category: "Student",
  },
  {
    id: "career",
    label: "Career\nIntel",
    description: "Career analytics, market trends, and intelligent job matching.",
    x: 85,
    y: 65,
    color: "#6366F1",
    category: "Career",
  },
  {
    id: "research",
    label: "Research\nAI",
    description: "Smart research companion for literature review and synthesis.",
    x: 8,
    y: 25,
    color: "#0EA5E9",
    category: "AI Tools",
  },
  {
    id: "analytics",
    label: "Learning\nAnalytics",
    description: "Study performance insights and learning pattern recognition.",
    x: 62,
    y: 80,
    color: "#14B8A6",
    category: "Student",
  },
];

export const ecoConnections: EcoConnection[] = [
  { from: "core", to: "desk", label: "AI Models", dataFlow: "Intelligence layer" },
  { from: "core", to: "chatpdf", label: "NLP Engine", dataFlow: "Document processing" },
  { from: "core", to: "resume", label: "Extraction AI", dataFlow: "Structured parsing" },
  { from: "core", to: "compass", label: "Recommendation", dataFlow: "Academic matching" },
  { from: "core", to: "student", label: "Personalization", dataFlow: "Adaptive learning" },
  { from: "core", to: "career", label: "Market AI", dataFlow: "Career intelligence" },
  { from: "desk", to: "chatpdf", label: "Documents", dataFlow: "PDF → Knowledge" },
  { from: "desk", to: "research", label: "Research", dataFlow: "Notes → Papers" },
  { from: "chatpdf", to: "research", label: "Citations", dataFlow: "Extract → Cite" },
  { from: "resume", to: "career", label: "Profile", dataFlow: "CV → Matching" },
  { from: "compass", to: "student", label: "Curriculum", dataFlow: "Plan → Track" },
  { from: "student", to: "analytics", label: "Progress", dataFlow: "Study → Insights" },
];

export const ecoCategories = ["Infrastructure", "Productivity", "AI Tools", "Student", "Career"] as const;
