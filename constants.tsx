import { Project } from './types';

export const WALLPAPER_URL = "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3270&auto=format&fit=crop";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "UI/UX Design",
    description: "Комплексная панель управления для финансового мониторинга с темной темой и визуализацией данных в реальном времени.",
    image: "https://picsum.photos/seed/finance/800/600",
    tags: ["Figma", "React", "Recharts"]
  },
  {
    id: 2,
    title: "EcoTravel App",
    category: "Mobile App",
    description: "Мобильное приложение для эко-туризма, позволяющее находить экологически чистые отели и маршруты.",
    image: "https://picsum.photos/seed/travel/800/600",
    tags: ["iOS", "SwiftUI", "UX Research"]
  },
  {
    id: 3,
    title: "Neon Commerce",
    category: "Web Design",
    description: "Футуристичный интернет-магазин уличной одежды с 3D-моделями товаров и интерактивной корзиной.",
    image: "https://picsum.photos/seed/neon/800/600",
    tags: ["Three.js", "WebGL", "Tailwind"]
  },
  {
    id: 4,
    title: "Meditate OS",
    category: "Product Design",
    description: "Концепция операционной системы, ориентированной на цифровое благополучие и фокусировку.",
    image: "https://picsum.photos/seed/calm/800/600",
    tags: ["Concept", "Motion", "Protopie"]
  }
];

export const SKILLS = [
  { name: "Figma", level: 95 },
  { name: "React / TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Motion Design", level: 80 },
  { name: "User Research", level: 85 },
  { name: "Node.js", level: 70 },
];