"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ColourfulText } from "@/components/ui/colourful-text";
import { FloatingDockDemo } from "./FloatingDashboardDock";

export function Dashboard() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative antialiased">
      <div className="mx-auto p-4 w-full flex justify-between items-center gap-4 mr-11">
        <h1 className="relative font-extrabold text-lg md:text-7xl bg-clip-text text-transparent bg-white font-sans m-2">
          Vivek's <ColourfulText text="Vibes" />
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="flex-1 max-w-sm p-4 rounded-3xl h-16 bg-neutral-800 font-bold text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />

        <FloatingDockDemo className="relative" />
      </div>

      <BackgroundBeams />
    </div>
  );
}
