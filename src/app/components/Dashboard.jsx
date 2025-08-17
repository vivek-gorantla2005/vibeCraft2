"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ColourfulText } from "@/components/ui/colourful-text";
import { FloatingDockDemo } from "./FloatingDashboardDock";
import { FeaturesSectionDemo } from "./Templates";
import { ProjectHistory } from "./History";
import { NewProjectSpotlight } from "./NewProject";
import { useUser } from "@clerk/nextjs";

export function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const username = user?.username;

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
        <div className="w-16 h-16 border-4 border-violet-500 border-dashed rounded-full animate-spin mb-6"></div>
        <h1 className="text-3xl font-extrabold">
          Loading <ColourfulText text="your vibes..." />
        </h1>
      </div>
    );
  }

  return (
    <div className="relative h-fit">
      <div className="w-full rounded-md bg-neutral-950 absolute antialiased">
        <div className="mx-auto p-4 w-full flex justify-between items-center gap-4 mr-11">
          <h1 className="relative font-extrabold text-lg md:text-7xl bg-clip-text text-transparent bg-white font-sans m-2">
            {username}'s <ColourfulText text="Vibes" />
          </h1>

          <input
            type="text"
            placeholder="Search..."
            className="flex-1 max-w-sm p-4 rounded-3xl h-16 bg-neutral-800 font-bold text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />

          <FloatingDockDemo className="relative" />
        </div>

        <div className="templates-section">
          <h1 className="text-white font-extrabold text-5xl m-10">
            Choose a Predefined Template
          </h1>
          <FeaturesSectionDemo />
        </div>

        <div className="new-project w-full mt-10">
          <NewProjectSpotlight className="w-full h-full" />
        </div>

        <div>
          <h1 className="text-white font-extrabold text-5xl m-10">
            Your Projects
          </h1>
          <ProjectHistory />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
