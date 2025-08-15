"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BackgroundLinesDemo } from "./BackgroundLinesDemo";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
  useUser,
} from '@clerk/nextjs'
import { MessageSquare } from "lucide-react";

export function SidebarDemo() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Chats",
      href: "#",
      icon: <MessageSquare className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row h-screen"
      )}
      style={{ backgroundColor: "#1b1c1b" }}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10" style={{ backgroundColor: "#161716" }}>
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto text-white">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <SidebarLink
                  link={{
                    label: "Login",
                    href: "#",
                    icon: (
                      <img
                        src="https://www.svgrepo.com/show/447124/login.svg"
                        className="h-6 w-6 shrink-0"
                        alt="Login"
                      />
                    ),
                  }}
                />
              </SignInButton>
            </SignedOut>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
        style={{ backgroundColor: "#1b1c1b" }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        VibeCraft
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div
      className="flex justify-center items-center flex-1 relative"
      style={{ backgroundColor: "#1e1f1e" }}
    >
      <BackgroundLinesDemo className="absolute inset-0 z-0" />
    </div>
  );
};