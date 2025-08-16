import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { NewProjectButton } from "./NewProjectButton";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function NewProjectSpotlight() {
    const words = [
        {
            text:"Build"
        },{
            text:"From"
        },{
            text:"Scratch"
        }
    ]
  return (
    <div
      className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center items-center"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 flex flex-col items-center">
        <h1
          className="font-extrabold text-white text-2xl md:text-7xl"
        >
          <TypewriterEffectSmooth words={words}/> 
        </h1>
        <p
          className="mx-auto mt-4 max-w-lg text-center font-bold text-base  text-neutral-300"
        >
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
        <div className="mt-1">
          <NewProjectButton/>
        </div>
      </div>
    </div>
  );
}
