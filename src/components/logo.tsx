import { cn } from "@/lib/utils";
import { Hand } from "lucide-react";

// Using an SVG for the horseshoe icon to avoid adding a new library
export const HorseshoeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M15.05 5A5 5 0 0 1 19 8.95" />
        <path d="M15.05 1A9 9 0 0 1 23 8.94" />
        <path d="M9.05 5A5 5 0 0 0 5 8.95" />
        <path d="M9.05 1A9 9 0 0 0 1 8.94" />
        <path d="M9 13.5c0 3.31 2.69 6 6 6h1" />
        <path d="M3 13.5c0 3.31 2.69 6 6 6h1" />
    </svg>
);


export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-black text-primary", className)}>
        <HorseshoeIcon className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground">HufManager</span>
    </div>
  );
}
