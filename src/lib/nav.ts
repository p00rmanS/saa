import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  Network,
  FlaskConical,
  ListChecks,
  Layers3,
  Target,
  ClipboardList,
  TrendingDown,
  LineChart,
  BookOpen,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Your readiness at a glance" },
  { href: "/course", label: "Learn", icon: GraduationCap, description: "Phases, modules, and lessons" },
  { href: "/services", label: "Services", icon: Layers, description: "Every AWS service, one page each" },
  { href: "/architectures", label: "Architectures", icon: Network, description: "Diagrams, patterns, what-if mode" },
  { href: "/labs", label: "Labs", icon: FlaskConical, description: "Hands-on guided practice" },
  { href: "/quizzes", label: "Quizzes", icon: ListChecks, description: "Domain quizzes and comparisons" },
  { href: "/flashcards", label: "Flashcards", icon: Layers3, description: "Spaced-repetition recall" },
  { href: "/exam-domains", label: "Exam Domains", icon: Target, description: "The 4 official SAA-C03 domains" },
  { href: "/mock-exams", label: "Mock Exams", icon: ClipboardList, description: "Full 65-question simulations" },
  { href: "/weak-areas", label: "Weak Areas", icon: TrendingDown, description: "Where to focus next" },
  { href: "/progress", label: "Progress", icon: LineChart, description: "Your study analytics" },
  { href: "/glossary", label: "Glossary", icon: BookOpen, description: "Searchable term definitions" },
  { href: "/settings", label: "Settings", icon: Settings, description: "Taglish, Mentor Mode, and more" },
];
