"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4 w-full"> 
      <div className="text-center mb-5">
        <p className="text-7xl text-white font-extrabold mb-2">
          VibeCraft
        </p>
        <p className="text-lg  text-white font-bold">
          Craft your imagination to reality!
        </p>
      </div>

      <PlaceholdersAndVanishInput
        className="bg-[#161716] text-white border border-neutral-700 w-full"
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
