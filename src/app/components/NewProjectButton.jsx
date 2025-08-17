"use client";
import React, { useState } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectStore from "store/Project";

export function NewProjectButton() {
  const [projectname, setProjectname] = useState("");
  const [projectdescription, setProjectdescription] = useState("");
  const { user } = useUser();
  const addProject = projectStore((state)=>state.addProject)

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setProjectname(value);
    if (id === "description") setProjectdescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: user?.id,
        username:
          user?.username ||
          user?.firstName ||
          user?.emailAddresses[0]?.emailAddress,
        projectname,
        projectdescription,
      };

      const res = await fetch("/api/newProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Project Created:", result);
        addProject(result);
        setProjectname("");
        setProjectdescription("");
        toast.success("Project created successfully!");
      } else {
        const error = await res.json();
        console.error("Failed to create project:", error);
        toast.error(`${error.message || "Failed to create project"}`);
      }
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("⚠ Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <HoverBorderGradient
            containerClassName="rounded-full m-10"
            as="button"
            className="dark:bg-black cursor-pointer text-white flex items-center justify-center text-center p-4 w-50"
          >
            <span>New Project</span>
          </HoverBorderGradient>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Project</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {/* Project Name */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter project name"
                  value={projectname}
                  onChange={handleChange}
                />
              </div>

              {/* Project Description */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter project description"
                  value={projectdescription}
                  onChange={handleChange}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
