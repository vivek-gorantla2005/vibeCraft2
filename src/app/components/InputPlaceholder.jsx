"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useUser } from "@clerk/nextjs";

export function PlaceholdersAndVanishInputDemo({projectid}) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); 
  const {user} = useUser();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          userId: user.id,
          projectid: projectid,
        }),
      });

      const data = await res.json();
      console.log("Agent Response:", data);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4 w-full">
      <div className="text-center mb-5">
        <p className="text-7xl text-white font-extrabold mb-2">VibeCraft</p>
        <p className="text-lg text-white font-bold">
          Craft your imagination to reality!
        </p>
      </div>

      <PlaceholdersAndVanishInput
        className="bg-[#161716] text-white border border-neutral-700 w-full"
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        disabled={loading}
      />

      {loading && (
        <div className="mt-4 flex items-center space-x-2 text-white">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Generating your vibe...</span>
        </div>
      )}
    </div>
  );
}
