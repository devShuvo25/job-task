"use client";

import ProjectAnalytics from "./ProjectBarchart";
import RemindersCard from "./Reminders";
import TeamCollaboration from "./TeamCollabration";
import {
  PROJECTS_DATA,
  TEAM_DATA,
} from "@/constant/dasboardTab";
import StatsGrid from "./StatesGrid";
import ProjectProgress from "./Progress";
import { RightSidebar } from "./RightSidebar";
import DashboardHeader from "./DashboardHeader";
import { useGetOverviewQuery } from "@/redux/api/dashboardApis";

const DashboardPage = () => {
    const {data : overview} = useGetOverviewQuery({})
    console.log(overview)
    
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT & MIDDLE CONTENT (Main Dashboard) */}
      <div className="flex-3 space-y-6">
        {/* Header with Actions */}
        <DashboardHeader
          onAddProject={() => console.log("Opening project modal...")}
          onImportData={() => console.log("Handling file import...")}
        />

        {/* Stats Grid */}
        <StatsGrid overview={overview} />
        {/* bottom */}
        <div className="flex justify-between items-center gap-5 w-full">
          {/* Analytics & Reminders Row */}
          <div className="w-full flex flex-col gap-3">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <div className="col-span-4">
                <ProjectAnalytics />
              </div>
              <div className="col-span-2">
                <RemindersCard />
              </div>
            </div>
            {/* Collaboration & Progress Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <TeamCollaboration
                members={TEAM_DATA}
                onAddMember={() => alert("Open Add Member Modal")}
              />
              <ProjectProgress percentage={41} subtitle="Project Ended" />
            </div>
          </div>
          {/* RIGHT SIDEBAR (Project List & Time Tracker) */}
          <RightSidebar projects={PROJECTS_DATA} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
