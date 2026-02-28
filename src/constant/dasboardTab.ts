import { ProjectItem, TeamMember } from "@/interface/dashboard";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Package, // Added for Products
} from "lucide-react";

export const NAV_MENU = {
  // PLATFORM OWNER
  SUPERADMIN: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Products", icon: Package, path: "/dashboard/products" }, // Filled icon and updated path
    {
      label: "Users",
      icon: User,
      path: "/dashboard/users",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/dashboard/analytics",
    }
  ],
};

export const NAV_GENERAL = [
  {
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    label: "Help",
    icon: HelpCircle,
    path: "/dashboard/help",
  },
  {
    label: "Logout",
    icon: LogOut,
    path: "/auth/logout",
  },
];

export const TEAM_DATA: TeamMember[] = [
  { name: "Alexandra Deff", task: "Github Project Repository", status: "Completed" },
  { name: "Edwin Adenike", task: "Integrate User Authentication", status: "In Progress" },
  { name: "Isaac Oluwatemilorun", task: "Develop Search Functionality", status: "Pending" },
  { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  { title: "Develop API Endpoints", date: "Nov 26, 2024", iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Onboarding Flow", date: "Nov 28, 2024", iconColor: "text-emerald-500", bgColor: "bg-emerald-50" },
  { title: "Build Dashboard", date: "Nov 30, 2024", iconColor: "text-orange-400", bgColor: "bg-orange-50" },
  { title: "Optimize Page Load", date: "Dec 5, 2024", iconColor: "text-yellow-500", bgColor: "bg-yellow-50" },
  { title: "Cross-Browser Testing", date: "Dec 6, 2024", iconColor: "text-indigo-500", bgColor: "bg-indigo-50" },
];