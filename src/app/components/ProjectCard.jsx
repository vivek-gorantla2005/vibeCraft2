import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProjectCard({
  projectId,
  projectName,
  prompt,
  sandboxUrl,
  githubUrl,
}) {
  return (
    <Card className="w-full max-w-md border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-2xl bg-[#3b3a3a]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {projectName}
        </CardTitle>
        <CardDescription>Project ID: {projectId}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {prompt}
        </p>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Sandbox:
          </p>
          <a
            href={sandboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {sandboxUrl}
          </a>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            GitHub:
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-all"
          >
            {githubUrl}
          </a>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button asChild variant="outline">
          <a href={sandboxUrl} target="_blank" rel="noopener noreferrer">
            Open Sandbox
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
