export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  span: number; // 7 or 5
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  client?: string;
  deliverables?: string[];
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  snippet: string;
  slug: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: string;
  rotation: string;
  col: 1 | 2;
  description: string;
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'national-gas-360',
    title: 'National Gas 360',
    category: 'Enterprise Platform & Mobile',
    year: '2026',
    span: 7,
    description: 'Comprehensive digital infrastructure and mobile management system powering utility and gas distribution logistics.',
    fullDescription: 'An enterprise-scale platform engineered to handle complex fleet telemetry, inventory reconciliation, customer order routing, and real-time billing. Built with a resilient microservices backend and native mobile interfaces.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    tags: ['Fullstack', 'System Architecture', 'Mobile App', 'Enterprise Logistics'],
    client: 'Founder & Lead Software Engineer',
    deliverables: ['Cloud Architecture', 'Mobile Applications', 'Fleet Operations Engine', 'Analytics Dashboard']
  },
  {
    id: 'codedrops',
    title: 'CodeDrops by Hasnain',
    category: 'Developer Education & AI Experiments',
    year: '2025',
    span: 5,
    description: 'Curated technical tutorials, deep dives into AI workflows, and modern software engineering practices.',
    fullDescription: 'A technical community and content hub providing hands-on tutorials on agentic development, modern fullstack tooling, Cursor AI integrations, and high-performance software craft.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Content Creation', 'Developer Tooling', 'AI Workflows', 'Community'],
    client: 'Founder & Creator',
    deliverables: ['Educational Hub', 'Curated Video Guides', 'Developer Sandbox']
  },
  {
    id: 'spanish-spatial-visualization',
    title: 'Modern Spanish Spatial Visualization',
    category: 'Spatial & 3D Architecture',
    year: '2026',
    span: 5,
    description: 'Detailed 3D architectural interior visualization and material studies for high-end residential spaces.',
    fullDescription: 'High-fidelity spatial renderings and lighting studies translating CAD drawings into photorealistic interior atmospheres with natural textures, clay plaster, and ambient lighting.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Architectural Design', '3D Rendering', 'CAD Workflows', 'Spatial Planning'],
    client: 'Spatial Design & 3D Rendering',
    deliverables: ['Photorealistic 3D Renders', 'Material Palettes', 'Spatial Planning Layouts']
  },
  {
    id: 'agentic-outreach-pipelines',
    title: 'Autonomous Outreach & Agent Pipelines',
    category: 'AI Systems & Automation',
    year: '2026',
    span: 7,
    description: 'AI-assisted pipeline using LLM integrations and automated workflows for developer outreach and task execution.',
    fullDescription: 'Multi-agent orchestration architecture leveraging autonomous LLM agents to perform intelligent code analysis, triage issues, automate outreach workflows, and manage developer tooling pipelines with zero human overhead.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    tags: ['Cursor AI', 'LLM Agents', 'Automation', 'Developer Tooling'],
    client: 'Internal Engineering',
    deliverables: ['Multi-Agent Engine', 'Custom LLM Tooling', 'Automated Dispatch']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'agentic-ides',
    title: 'Supercharging Engineering Workflows with Agentic IDEs',
    category: 'AI Engineering',
    readTime: '5 min read',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    snippet: 'How combining modern LLMs, Cursor AI, and structured agent setups accelerates feature delivery.',
    slug: 'supercharging-engineering-workflows-with-agentic-ides'
  },
  {
    id: 'resilient-enterprise',
    title: 'Architecting Resilient Enterprise Solutions',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    snippet: 'Core principles for designing distributed, highly available systems that scale gracefully.',
    slug: 'architecting-resilient-enterprise-solutions'
  },
  {
    id: 'engineer-to-founder',
    title: 'From Engineer to Founder: Navigating Technical Strategy',
    category: 'Leadership',
    readTime: '4 min read',
    date: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    snippet: 'Balancing deep code execution with high-level product roadmap decisions.',
    slug: 'from-engineer-to-founder-navigating-technical-strategy'
  },
  {
    id: '3d-spatial-design',
    title: 'Bridging 3D Visualization and Spatial Design',
    category: 'Spatial Design',
    readTime: '5 min read',
    date: 'Jan 2026',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    snippet: 'Translating CAD working drawings into photorealistic spatial atmospheres.',
    slug: 'bridging-3d-visualization-and-spatial-design'
  }
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'Cinematic Studio Portraits',
    subtitle: 'Monochrome Lighting Studies',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: '-rotate-2',
    col: 1,
    description: 'High-contrast studio lighting exploration capturing raw form, depth, and shadow values.'
  },
  {
    id: 'exp-2',
    title: 'Cyberpunk Terminal HUD',
    subtitle: 'High-Density Telemetry Interface',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: 'rotate-3',
    col: 2,
    description: 'Futuristic telemetry overlay concept designed for high-throughput command terminals.'
  },
  {
    id: 'exp-3',
    title: 'Modern Spanish Interior Node',
    subtitle: 'Textured Wood & Stone Renders',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: 'rotate-1',
    col: 1,
    description: 'Organic architectural render featuring earthen textures, lime wash, and warm oak.'
  },
  {
    id: 'exp-4',
    title: 'CLI Tooling & Terminal Shaders',
    subtitle: 'Minimalist Dev Environment',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: '-rotate-3',
    col: 2,
    description: 'Custom command-line shader theme and typography designed for ultra-productive coding.'
  },
  {
    id: 'exp-5',
    title: 'Agentic Workflow Scripts',
    subtitle: 'Autonomous Process Automations',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: 'rotate-2',
    col: 1,
    description: 'Self-healing automated pipeline scripts executing parallel tasks in background sandboxes.'
  },
  {
    id: 'exp-6',
    title: 'Geometric Archival Space',
    subtitle: 'Minimalist Spatial Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-square',
    rotation: '-rotate-1',
    col: 2,
    description: 'Monumental geometric structure studies focused on symmetry, glass reflection, and concrete monoliths.'
  }
];

export const STATS: StatItem[] = [
  {
    number: '10+',
    label: 'Years in Tech',
    description: 'Delivering scalable software systems and leading high-performing engineering teams.'
  },
  {
    number: '50+',
    label: 'Projects Shipped',
    description: 'Built enterprise platforms, fullstack web applications, and developer tools.'
  },
  {
    number: '100%',
    label: 'Commitment to Quality',
    description: 'Focused on clean architecture, high uptime, and modern engineering standards.'
  }
];
