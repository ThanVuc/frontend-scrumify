export type ProjectStatus = "in_progress" | "on_track" | "planning" | "active_beta";

export type ProjectIconType = "platform" | "design" | "api" | "mobile";

export type ProjectStatIconType = "projects" | "pbis" | "velocity" | "contributors";

export interface ProjectMember {
  initials: string;
  colorClass: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  scheduleType: "sprint" | "start";
  scheduleLabel: string;
  pbiSummary: string;
  icon: ProjectIconType;
  members: ProjectMember[];
  extraMembersCount?: number;
}

export interface ProjectStat {
  id: string;
  label: string;
  value: string;
  unit: string;
  unitAccent?: boolean;
  subtitle: string;
  icon: ProjectStatIconType;
}

export const STUB_PROJECT_STATS: ProjectStat[] = [
  {
    id: "total-projects",
    label: "TOTAL PROJECTS",
    value: "5",
    unit: "+2 this mo",
    unitAccent: true,
    subtitle: "Across 3 squads",
    icon: "projects",
  },
  {
    id: "active-pbis",
    label: "ACTIVE PBIS",
    value: "124",
    unit: "issues",
    subtitle: "88 resolved in Sprint 4",
    icon: "pbis",
  },
  {
    id: "sprint-velocity",
    label: "SPRINT VELOCITY",
    value: "42",
    unit: "pts / sprint",
    unitAccent: true,
    subtitle: "+8% above baseline",
    icon: "velocity",
  },
  {
    id: "contributors",
    label: "CONTRIBUTORS",
    value: "18",
    unit: "members",
    subtitle: "94% sprint allocation",
    icon: "contributors",
  },
];

export const STUB_PROJECTS: ProjectItem[] = [
  {
    id: "project-a",
    name: "Project A",
    description: "Core platform infrastructure and agile backlog management services.",
    status: "in_progress",
    statusLabel: "In Progress",
    scheduleType: "sprint",
    scheduleLabel: "Sprint 4 • Ends Oct 25",
    pbiSummary: "14/20 PBIs",
    icon: "platform",
    members: [
      { initials: "AK", colorClass: "bg-indigo-500 text-white" },
      { initials: "ML", colorClass: "bg-sky-500 text-white" },
      { initials: "JD", colorClass: "bg-emerald-500 text-white" },
    ],
    extraMembersCount: 3,
  },
  {
    id: "project-b",
    name: "Project B",
    description: "Design system tokenization, dark mode theme engine, and component library.",
    status: "on_track",
    statusLabel: "On Track",
    scheduleType: "sprint",
    scheduleLabel: "Sprint 6 • Ends Nov 02",
    pbiSummary: "22/28 PBIs",
    icon: "design",
    members: [
      { initials: "EL", colorClass: "bg-amber-500 text-white" },
      { initials: "SN", colorClass: "bg-rose-500 text-white" },
    ],
    extraMembersCount: 1,
  },
  {
    id: "project-c",
    name: "Project C",
    description: "Public developer API documentation and webhook subscription portal.",
    status: "planning",
    statusLabel: "Planning",
    scheduleType: "start",
    scheduleLabel: "Starts Nov 05",
    pbiSummary: "3/16 PBIs",
    icon: "api",
    members: [
      { initials: "TC", colorClass: "bg-violet-500 text-white" },
      { initials: "RH", colorClass: "bg-teal-500 text-white" },
    ],
  },
  {
    id: "project-d",
    name: "Project D • Mobile App",
    description: "iOS and Android offline-first agile standup and backlog triage client.",
    status: "active_beta",
    statusLabel: "Active Beta",
    scheduleType: "sprint",
    scheduleLabel: "Sprint 3 • Ends Nov 10",
    pbiSummary: "19/22 PBIs",
    icon: "mobile",
    members: [
      { initials: "VN", colorClass: "bg-pink-500 text-white" },
      { initials: "DK", colorClass: "bg-cyan-500 text-white" },
      { initials: "SA", colorClass: "bg-orange-500 text-white" },
    ],
  },
];
