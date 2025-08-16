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
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewProjectButton() {
  return (
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
              <Input id="name" type="text" placeholder="Enter project name" />
            </div>

            {/*projet description*/}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Project Description</Label>
              <Input id="description" type="text" placeholder="Enter project description" />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
