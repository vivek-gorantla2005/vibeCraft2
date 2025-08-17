"use client";
import React, { useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
} from "@tabler/icons-react";
import projectStore from "store/Project";
import { useUser } from "@clerk/nextjs";

export function ProjectHistory() {
  const { user } = useUser();
  const { projects, getProjects } = projectStore();

  useEffect(() => {
    if (user?.id) {
      getProjects(user.id);
    }
  }, [user]);

  return (
    <BentoGrid className="w-[80vw]">
      {projects.length > 0 ? (
        projects.map((project, i) => (
          <a href={`/projects/${project._id}`}>
          <BentoGridItem
            key={project._id || i}
            title={project.projectname}
            description={project.projectdescription}
            header={<Skeleton />}
            icon={
              <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
            }
            className={i % 3 === 0 ? "md:col-span-2" : ""}
            />
            </a>
        ))
      ) : (
        <p className="text-neutral-400">No projects found.</p>
      )}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
);
