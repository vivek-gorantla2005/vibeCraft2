import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const templates = [
  {
    title: "Portfolio Website",
    description: "Showcase your projects and skills with a modern portfolio layout.",
    icon: <IconTerminal2 />,
    image: "/templates/portfolio.png", // optional thumbnail
  },
  {
    title: "E-commerce Store",
    description: "Sell your products online with a fully responsive e-commerce template.",
    icon: <IconCurrencyDollar />,
    image: "/templates/ecommerce.png",
  },
  {
    title: "Personal Blog",
    description: "Share your thoughts with a clean, elegant blog design.",
    icon: <IconEaseInOut />,
    image: "/templates/blog.png",
  },
  {
    title: "Landing Page",
    description: "Create a high-converting landing page for your product or service.",
    icon: <IconRouteAltLeft />,
    image: "/templates/landing.png",
  },
  {
    title: "SaaS Dashboard",
    description: "Admin dashboard template for your SaaS product with analytics widgets.",
    icon: <IconAdjustmentsBolt />,
    image: "/templates/dashboard.png",
  },
  {
    title: "Startup Website",
    description: "Showcase your startup with sections for features, team, and testimonials.",
    icon: <IconHeart />,
    image: "/templates/startup.png",
  },
  {
    title: "Agency Portfolio",
    description: "Modern agency template to display services, clients, and case studies.",
    icon: <IconHelp />,
    image: "/templates/agency.png",
  },
  {
    title: "Event Website",
    description: "Promote your event with schedules, speakers, and ticket booking sections.",
    icon: <IconCloud />,
    image: "/templates/event.png",
  },
];


  return (
    <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto bg-black text-white">
      {templates.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-700",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-900 to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-10 text-gray-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
