import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid m-10 w-[80vw] grid-cols-1 gap-4 md:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-lg row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-gray-700 bg-black p-4 transition duration-200 hover:shadow-blue-500",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-white">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};
