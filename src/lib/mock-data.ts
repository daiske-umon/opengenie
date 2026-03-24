export const stats = [
  { label: "Ideas Submitted", value: 47, suffix: "" },
  { label: "Votes Cast", value: 1200, suffix: "+" },
  { label: "Projects Shipped", value: 12, suffix: "" },
  { label: "Contributors", value: 89, suffix: "" },
];

export const featuredProjects = [
  {
    id: 1,
    title: "DevPulse",
    description:
      "Real-time developer activity dashboard. See who's shipping, what's trending, and where the action is.",
    techStack: ["Next.js", "WebSocket", "Redis", "Tailwind"],
    votes: 342,
    status: "shipped" as const,
    image: "/placeholder-project.svg",
  },
  {
    id: 2,
    title: "GitFlow AI",
    description:
      "AI-powered PR review assistant that catches bugs before your teammates do. Integrates with GitHub Actions.",
    techStack: ["Python", "FastAPI", "OpenAI", "GitHub API"],
    votes: 287,
    status: "shipped" as const,
    image: "/placeholder-project.svg",
  },
  {
    id: 3,
    title: "StackSnap",
    description:
      "Generate beautiful tech stack visualizations for your README. One command, instant architecture diagrams.",
    techStack: ["TypeScript", "D3.js", "CLI", "SVG"],
    votes: 256,
    status: "shipped" as const,
    image: "/placeholder-project.svg",
  },
  {
    id: 4,
    title: "EnvGuard",
    description:
      "Never leak secrets again. Scans your codebase for exposed credentials and auto-rotates compromised keys.",
    techStack: ["Rust", "WASM", "GitHub App", "Vault"],
    votes: 198,
    status: "building" as const,
    image: "/placeholder-project.svg",
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Idea Submitter",
    avatar: "SC",
    content:
      "I submitted an idea early in the month, it got 200+ votes during voting week, and by release day there was a working prototype. This is how open source should work.",
  },
  {
    name: "Marcus Johnson",
    role: "Core Contributor",
    avatar: "MJ",
    content:
      "3wishes gave me a reason to ship every month. The ideas are real, the community is supportive, and I've shipped more here than in my day job.",
  },
  {
    name: "Aiko Tanaka",
    role: "Idea Submitter & Contributor",
    avatar: "AT",
    content:
      "Seeing my idea go from a napkin sketch to a live open-source project with 50 stars in two weeks was absolutely surreal.",
  },
];

export const ideas = [
  {
    id: 1,
    title: "AI-powered code review bot",
    description:
      "A GitHub bot that reviews PRs using LLMs and suggests improvements based on project conventions.",
    votes: 342,
    status: "building" as const,
    tags: ["AI", "Developer Tools", "GitHub"],
    author: "sarah_dev",
    commentCount: 23,
  },
  {
    id: 2,
    title: "Open source Calendly alternative",
    description:
      "Privacy-first scheduling tool with Cal.com-level features but even simpler setup. One-click deploy.",
    votes: 287,
    status: "voting" as const,
    tags: ["Productivity", "SaaS", "Privacy"],
    author: "marcus_j",
    commentCount: 18,
  },
  {
    id: 3,
    title: "CLI dashboard for cloud costs",
    description:
      "Terminal-based dashboard showing real-time cloud spending across AWS, GCP, and Azure. TUI built with Ink.",
    votes: 256,
    status: "voting" as const,
    tags: ["Cloud", "CLI", "DevOps"],
    author: "cloud_watcher",
    commentCount: 15,
  },
  {
    id: 4,
    title: "Markdown-to-slides generator",
    description:
      "Write talks in Markdown, get beautiful slides. Supports themes, speaker notes, and live preview.",
    votes: 198,
    status: "submitted" as const,
    tags: ["Productivity", "Markdown", "Presentations"],
    author: "slide_queen",
    commentCount: 9,
  },
  {
    id: 5,
    title: "Package dependency visualizer",
    description:
      "Interactive graph showing your project's dependency tree with vulnerability highlights and size analysis.",
    votes: 176,
    status: "shipped" as const,
    tags: ["Developer Tools", "Security", "Visualization"],
    author: "dep_detective",
    commentCount: 31,
  },
  {
    id: 6,
    title: "Open source feature flag service",
    description:
      "Self-hosted feature flags with a clean dashboard, SDK for 10+ languages, and A/B testing built in.",
    votes: 164,
    status: "voting" as const,
    tags: ["Infrastructure", "SaaS", "Developer Tools"],
    author: "flag_master",
    commentCount: 12,
  },
];
