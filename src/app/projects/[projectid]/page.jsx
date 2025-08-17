import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { PlaceholdersAndVanishInputDemo } from "@/app/components/InputPlaceholder";


const Page = ({ params })=> {
  const { projectid } = params
  return (
    <div className="h-screen w-full" style={{ backgroundColor: "#1b1c1b" }}>
      <BackgroundLines className="flex items-center justify-center flex-col px-4 h-full">
        <PlaceholdersAndVanishInputDemo projectid={projectid}/>
      </BackgroundLines>

    </div>
  );
};

export default Page;
