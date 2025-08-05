"use client";

import React, { useRef, useEffect, useState } from "react";
import {
    IconArrowLeft,
    IconFolder,
    IconFile,
    IconMenu2,
} from "@tabler/icons-react";
import { motion, vh } from "motion/react";
import { cn } from "@/lib/utils";
import CodeEditor from "./codeEditor";
import Terminal from "./Terminal";

export function CodeEditorSidebar() {
    const [open, setOpen] = useState(true);
    // Dummy folder structure
    const projectStructure = [
        {
            name: "src",
            type: "folder",
            children: [
                {
                    name: "App.tsx",
                    type: "file",
                },
                {
                    name: "components",
                    type: "folder",
                    children: [
                        {
                            name: "ui", type: "folder", children: [
                                {
                                    name: "button.tsx",
                                    type: "file"
                                }
                            ]
                        },
                        { name: "Sidebar.tsx", type: "file" },
                        { name: "Header.tsx", type: "file" },
                    ],
                },
            ],
        },
        {
            name: "package.json",
            type: "file",
        },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {open && (
                <div
                    className="flex flex-col w-72 bg-[#161716] text-white p-4 space-y-4"
                    style={{ transition: "width 0.3s ease" }}
                >
                    <div className="flex justify-between items-center">
                        <Logo />
                        <button onClick={() => setOpen(false)} title="Close Sidebar">
                            <IconArrowLeft className="h-5 w-5 text-white" />
                        </button>
                    </div>
                    <div className="overflow-y-auto mt-2 flex-1">
                        <FolderTree tree={projectStructure} />
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                        <SidebarFooter />
                    </div>
                </div>
            )}

            {!open && (
                <div className="w-10 bg-[#1b1c1b] flex items-start justify-center p-2">
                    <button onClick={() => setOpen(true)} title="Open Sidebar" className="cursor-pointer">
                        <IconMenu2 className="text-white" />
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 bg-[#1e1f1e]">
                <Dashboard />
            </div>
        </div>
    );
}

const FolderTree = ({ tree }) => {
    return (
        <ul className="pl-2 space-y-2">
            {tree.map((item, index) => (
                <li key={index}>
                    {item.type === "folder" ? (
                        <FolderNode folder={item} />
                    ) : (
                        <FileNode file={item} />
                    )}
                </li>
            ))}
        </ul>
    );
};

const FolderNode = ({ folder }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div>
            <div
                className="flex items-center cursor-pointer hover:text-gray-300"
                onClick={() => setExpanded(!expanded)}
            >
                <IconFolder className="h-4 w-4 mr-2" />
                <span>{folder.name}</span>
            </div>
            {expanded && folder.children && (
                <div className="ml-4">
                    <FolderTree tree={folder.children} />
                </div>
            )}
        </div>
    );
};

const FileNode = ({ file }) => (
    <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer pl-6">
        <IconFile className="h-4 w-4 mr-2" />
        {file.name}
    </div>
);

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <div
                className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm"
                style={{ backgroundColor: "#1b1c1b" }}
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-white"
            >
                Project
            </motion.span>
        </div>
    );
};

const SidebarFooter = () => (
    <div className="flex items-center space-x-2">
        <img
            src="https://assets.aceternity.com/manu.png"
            className="h-7 w-7 rounded-full"
            alt="Avatar"
        />
        <span>Manu Arora</span>
    </div>
);


const Dashboard = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const terminalRef = useRef(null);

  const focusTerminal = () => {
    terminalRef.current?.focus();
  };

  useEffect(() => {
    terminalRef.current?.focus();
  }, []);

  const terminalHeight = isTerminalOpen ? 256 : 40; 

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full">
        <CodeEditor />
      </div>

      <div
        className="absolute bottom-0 w-full flex justify-end pr-4 z-30"
        style={{ bottom: `${terminalHeight}px` }}
      >
        <button
          onClick={() => setIsTerminalOpen(prev => !prev)}
          className="mb-1 bg-neutral-800 text-white px-3 py-1 text-sm rounded hover:bg-neutral-700 transition"
        >
          {isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}
        </button>
      </div>

      <div
        ref={terminalRef}
        style={{ height: `${terminalHeight}px` }}
        className="absolute bottom-0 left-0 w-full border-t border-neutral-800 z-10 transition-all duration-300"
      >
        <Terminal onClick={focusTerminal} />
      </div>
    </div>
  );
};

