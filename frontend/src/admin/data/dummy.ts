// Central dummy data for the admin panel. Swap for API calls when backend lands.

export type Trend = { name: string; value: number; value2?: number };

export const monthlyVisitors: Trend[] = [
  { name: "Jan", value: 4200, value2: 2400 },
  { name: "Feb", value: 5100, value2: 2900 },
  { name: "Mar", value: 4800, value2: 3100 },
  { name: "Apr", value: 6300, value2: 3600 },
  { name: "May", value: 7200, value2: 4100 },
  { name: "Jun", value: 8100, value2: 4800 },
  { name: "Jul", value: 9200, value2: 5400 },
  { name: "Aug", value: 8800, value2: 5100 },
  { name: "Sep", value: 10200, value2: 6200 },
  { name: "Oct", value: 11800, value2: 7100 },
  { name: "Nov", value: 12600, value2: 7800 },
  { name: "Dec", value: 14200, value2: 8900 },
];

export const monthlyLeads: Trend[] = monthlyVisitors.map((m) => ({
  name: m.name,
  value: Math.round((m.value ?? 0) / 22),
}));

export const monthlyRevenue: Trend[] = monthlyVisitors.map((m) => ({
  name: m.name,
  value: Math.round((m.value ?? 0) * 3.2),
}));

export const topServices: Trend[] = [
  { name: "Web Dev", value: 42 },
  { name: "Mobile", value: 28 },
  { name: "AI/ML", value: 19 },
  { name: "Cloud", value: 15 },
  { name: "Design", value: 11 },
];

export const trafficSources: Trend[] = [
  { name: "Organic", value: 48 },
  { name: "Direct", value: 22 },
  { name: "Referral", value: 15 },
  { name: "Social", value: 10 },
  { name: "Paid", value: 5 },
];

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  status: "New" | "Contacted" | "Qualified" | "Won" | "Lost";
  createdAt: string;
};

export const leads: Lead[] = Array.from({ length: 24 }).map((_, i) => {
  const statuses: Lead["status"][] = ["New", "Contacted", "Qualified", "Won", "Lost"];
  const services = ["Web Development", "Mobile App", "UI/UX Design", "Cloud", "AI Integration"];
  return {
    id: `LD-${1000 + i}`,
    name: ["Aarav Sharma", "Priya Patel", "James Wilson", "Sofia Rossi", "Chen Wei", "Fatima Noor"][
      i % 6
    ],
    email: `client${i + 1}@example.com`,
    company: ["Acme", "Globex", "Initech", "Umbrella", "Wonka", "Stark Ind."][i % 6],
    service: services[i % services.length],
    budget: ["$5k-10k", "$10k-25k", "$25k-50k", "$50k+"][i % 4],
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  status: "Draft" | "Published" | "Archived";
  updatedAt: string;
};

export const projects: Project[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `PR-${200 + i}`,
  title:
    ["FinPay Dashboard", "MediCare App", "ShopStream", "EduFlex LMS", "TravelHub", "CryptoWatch"][
      i % 6
    ] + ` v${i + 1}`,
  client: ["Nova Bank", "Wellness Co", "RetailX", "EduCorp", "Wanderlust", "BlockLabs"][i % 6],
  category: ["Web App", "Mobile App", "SaaS", "AI Product", "eCommerce"][i % 5],
  status: (["Published", "Draft", "Archived"] as const)[i % 3],
  updatedAt: new Date(Date.now() - i * 3600_000 * 12).toISOString(),
}));

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "Draft" | "Published";
  views: number;
  publishedAt: string;
};

export const blogPosts: BlogPost[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `BP-${300 + i}`,
  title: [
    "Scaling React apps in 2026",
    "Edge-first architecture with TanStack",
    "Design tokens that don't suck",
    "The pragmatic guide to LLM ops",
    "From monolith to modular monolith",
    "A11y patterns you can ship today",
  ][i % 6],
  author: ["Ayesha K.", "Marcus L.", "Diego R.", "Hana T."][i % 4],
  category: ["Engineering", "Design", "AI", "Product"][i % 4],
  status: i % 3 === 0 ? "Draft" : "Published",
  views: 400 + i * 137,
  publishedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}));

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "Active" | "On Leave";
  avatar: string;
};

export const team: TeamMember[] = [
  "Aarav Sharma:Founder & CEO",
  "Priya Patel:CTO",
  "Marcus Lee:Head of Design",
  "Hana Tanaka:Engineering Lead",
  "Diego Rivera:Product Manager",
  "Sofia Rossi:Senior Developer",
  "Chen Wei:AI Engineer",
  "Fatima Noor:Marketing Lead",
].map((s, i) => {
  const [name, role] = s.split(":");
  return {
    id: `TM-${i + 1}`,
    name,
    role,
    email: `${name.split(" ")[0].toLowerCase()}@codenest.dev`,
    status: i % 5 === 0 ? "On Leave" : "Active",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
  };
});

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Intern";
  applicants: number;
  status: "Open" | "Closed";
};

export const jobs: Job[] = [
  {
    id: "J-1",
    title: "Senior React Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    applicants: 42,
    status: "Open",
  },
  {
    id: "J-2",
    title: "Product Designer",
    department: "Design",
    location: "Bangalore",
    type: "Full-time",
    applicants: 28,
    status: "Open",
  },
  {
    id: "J-3",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    applicants: 12,
    status: "Open",
  },
  {
    id: "J-4",
    title: "AI/ML Engineer",
    department: "AI",
    location: "Remote",
    type: "Full-time",
    applicants: 61,
    status: "Open",
  },
  {
    id: "J-5",
    title: "Growth Marketer",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    applicants: 19,
    status: "Closed",
  },
  {
    id: "J-6",
    title: "Frontend Intern",
    department: "Engineering",
    location: "Remote",
    type: "Intern",
    applicants: 89,
    status: "Open",
  },
];

export type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  active: boolean;
};

export const services: Service[] = [
  {
    id: "S-1",
    name: "Custom Web Development",
    category: "Web",
    price: "From $5,000",
    active: true,
  },
  {
    id: "S-2",
    name: "Mobile App Development",
    category: "Mobile",
    price: "From $8,000",
    active: true,
  },
  { id: "S-3", name: "UI/UX Design", category: "Design", price: "From $3,000", active: true },
  { id: "S-4", name: "Cloud & DevOps", category: "Infra", price: "From $4,000", active: true },
  { id: "S-5", name: "AI Integration", category: "AI", price: "From $6,000", active: true },
  { id: "S-6", name: "eCommerce Solutions", category: "Web", price: "From $7,500", active: false },
];

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
  approved: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "T-1",
    name: "Rohan Mehta",
    company: "Nova Bank",
    quote: "CodeNest delivered beyond expectations — polished, fast, and reliable.",
    rating: 5,
    approved: true,
  },
  {
    id: "T-2",
    name: "Emily Chen",
    company: "RetailX",
    quote: "Their design team is world-class. Our conversion rate jumped 38%.",
    rating: 5,
    approved: true,
  },
  {
    id: "T-3",
    name: "Luis García",
    company: "EduCorp",
    quote: "The most professional agency we've worked with in a decade.",
    rating: 4,
    approved: true,
  },
  {
    id: "T-4",
    name: "Sara Ahmed",
    company: "BlockLabs",
    quote: "Great engineering culture. They ship.",
    rating: 5,
    approved: false,
  },
];

export type Plan = {
  id: string;
  name: string;
  price: string;
  interval: "month" | "one-time";
  featured: boolean;
  active: boolean;
};

export const plans: Plan[] = [
  {
    id: "P-1",
    name: "Starter",
    price: "$2,499",
    interval: "one-time",
    featured: false,
    active: true,
  },
  {
    id: "P-2",
    name: "Professional",
    price: "$7,999",
    interval: "one-time",
    featured: true,
    active: true,
  },
  {
    id: "P-3",
    name: "Enterprise",
    price: "Custom",
    interval: "month",
    featured: false,
    active: true,
  },
];

export type MediaFile = {
  id: string;
  name: string;
  type: "image" | "video" | "doc";
  size: string;
  url: string;
  uploadedAt: string;
};

export const media: MediaFile[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `M-${i + 1}`,
  name: `asset-${i + 1}.${["jpg", "png", "mp4", "pdf"][i % 4]}`,
  type: (["image", "image", "video", "doc"] as const)[i % 4],
  size: `${(Math.random() * 4 + 0.2).toFixed(2)} MB`,
  url: `https://picsum.photos/seed/${i + 1}/400/300`,
  uploadedAt: new Date(Date.now() - i * 3600_000 * 6).toISOString(),
}));

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
};

export const adminUsers: AdminUser[] = [
  {
    id: "U-1",
    name: "Aarav Sharma",
    email: "aarav@codenest.dev",
    role: "Owner",
    status: "Active",
    lastActive: "2m ago",
  },
  {
    id: "U-2",
    name: "Priya Patel",
    email: "priya@codenest.dev",
    role: "Admin",
    status: "Active",
    lastActive: "1h ago",
  },
  {
    id: "U-3",
    name: "Marcus Lee",
    email: "marcus@codenest.dev",
    role: "Editor",
    status: "Active",
    lastActive: "3h ago",
  },
  {
    id: "U-4",
    name: "Hana Tanaka",
    email: "hana@codenest.dev",
    role: "Editor",
    status: "Invited",
    lastActive: "—",
  },
  {
    id: "U-5",
    name: "Diego Rivera",
    email: "diego@codenest.dev",
    role: "Viewer",
    status: "Suspended",
    lastActive: "5d ago",
  },
];

export type AdminNotification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning" | "lead";
  read: boolean;
};

export const notifications: AdminNotification[] = [
  {
    id: "N-1",
    title: "New lead from Acme Corp",
    description: "Website enquiry — $25k+ budget",
    time: "2m ago",
    type: "lead",
    read: false,
  },
  {
    id: "N-2",
    title: "Deployment successful",
    description: "codenest.dev v2.14.0 pushed to production",
    time: "18m ago",
    type: "success",
    read: false,
  },
  {
    id: "N-3",
    title: "Storage at 78%",
    description: "Consider archiving old media assets",
    time: "2h ago",
    type: "warning",
    read: false,
  },
  {
    id: "N-4",
    title: "Weekly analytics ready",
    description: "Traffic up 12% week-over-week",
    time: "1d ago",
    type: "info",
    read: true,
  },
  {
    id: "N-5",
    title: "New testimonial submitted",
    description: "Awaiting approval from RetailX",
    time: "2d ago",
    type: "info",
    read: true,
  },
];

export const activities = [
  { id: 1, who: "Priya Patel", what: "published a blog post", when: "5m ago" },
  { id: 2, who: "Marcus Lee", what: "updated the homepage hero", when: "22m ago" },
  { id: 3, who: "Diego Rivera", what: "added a new lead", when: "1h ago" },
  { id: 4, who: "Hana Tanaka", what: "closed job — Frontend Intern", when: "3h ago" },
  { id: 5, who: "Aarav Sharma", what: "invited a new admin", when: "1d ago" },
];
