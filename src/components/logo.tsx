import { cn } from "@/lib/utils";

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
        <path d="M6.6 2.4a6.4 6.4 0 0 0-4 6.1v4.8a7.3 7.3 0 0 0 7.3 7.3h4.2a7.3 7.3 0 0 0 7.3-7.3V8.5a6.4 6.4 0 0 0-4-6.1"/>
        <path d="M12 14.5v-3.5"/>
        <path d="m8.5 11 3.5-3.5 3.5 3.5"/>
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
