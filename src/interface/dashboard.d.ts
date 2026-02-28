/**
 * Status types used across the dashboard for tasks and team members
 */
export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Pending"
  | "On Discuss";

/**
 * Represents a member in the Team Collaboration component
 */
export interface TeamMember {
  name: string;
  task: string;
  status: Exclude<ProjectStatus, "On Discuss">; // Restricts to only valid team statuses
  avatarSeed?: string;
}

/**
 * Represents a single project item in the sidebar list
 */
export interface ProjectItem {
  title: string;
  date: string;
  iconColor: string; // Tailwind class like 'bg-blue-500'
  bgColor: string; // Tailwind class like 'bg-blue-50'
}

/**
 * Props for the RemindersCard component
 */
export interface RemindersCardProps {
  title?: string;
  meetingName?: string;
  timeRange?: string;
  onStartMeeting?: () => void;
}

/**
 * Props for the StatCard component
 */
export interface StatCardProps {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

