"use client";

import ProjectAnalytics from "./ProjectBarchart";
import RemindersCard from "./Reminders";
import TeamCollaboration from "./TeamCollabration";
import { PROJECTS_DATA, TEAM_DATA } from "@/constant/dasboardTab";
import StatsGrid from "./StatesGrid";
import ProjectProgress from "./Progress";
import { RightSidebar } from "./RightSidebar";
import DashboardHeader from "./DashboardHeader";
import { useGetOverviewQuery } from "@/redux/api/dashboardApis";

const DashboardPage = () => {
  const { data: overview } = useGetOverviewQuery({});

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Actions */}
      <DashboardHeader
        onAddProject={() => console.log("Opening project modal...")}
        onImportData={() => console.log("Handling file import...")}
      />

      {/* Stats Grid - Automatically handles its own grid internally */}
      <StatsGrid overview={overview} />

      {/* Main Container: 
          Desktop: Side-by-side using lg:flex-row
          Mobile: Stacked using flex-col
      */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        {/* LEFT & MIDDLE CONTENT (Charts, Team, Progress) */}
        <div className="w-full lg:flex-1 space-y-6 order-1">
          {/* Analytics & Reminders Row */}
          <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
            <div className="xl:col-span-4">
              <ProjectAnalytics />
            </div>
            <div className="xl:col-span-2">
              <RemindersCard />
            </div>
          </div>

          {/* Collaboration & Progress Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamCollaboration
              members={TEAM_DATA}
              onAddMember={() => alert("Open Add Member Modal")}
            />
            <ProjectProgress percentage={41} subtitle="Project Ended" />
          </div>
        </div>

        {/* RIGHT SIDEBAR (Project List & Time Tracker) 
            w-full on mobile, fixed width or specific basis on desktop
        */}
        <div className="w-full lg:w-[320px] xl:w-[300px] order-2 lg:sticky lg:top-6">
          <RightSidebar projects={PROJECTS_DATA} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
