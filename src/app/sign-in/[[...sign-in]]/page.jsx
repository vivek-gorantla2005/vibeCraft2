"use client";

import { SignIn } from "@clerk/nextjs";
import { Cover } from "@/components/ui/cover";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black/[0.96] antialiased flex flex-col items-center justify-center px-4">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 select-none [background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Spotlight background */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      {/* Foreground content */}
      <div className="z-10 text-center space-y-10 items-center justify-center flex flex-col">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
            Sign in <br />
            to unlock real <Cover className="inline-block">Powers</Cover>
          </h1>
        </div>

        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
