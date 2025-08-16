import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { PlaceholdersAndVanishInputDemo } from "./InputPlaceholder";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-full">
      <PlaceholdersAndVanishInputDemo/>
    </BackgroundLines>
  );
}
