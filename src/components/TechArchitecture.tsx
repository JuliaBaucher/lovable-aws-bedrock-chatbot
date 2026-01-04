import { Server, Cloud, Globe, Cpu, Database, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function ArchitectureItem({ icon, title, description, className }: ArchitectureItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function TechArchitecture() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Tech Architecture
      </h3>
      
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="rounded-md bg-secondary px-2 py-1">GitHub Pages</span>
        <ArrowRight className="h-4 w-4" />
        <span className="rounded-md bg-secondary px-2 py-1">API Gateway</span>
        <ArrowRight className="h-4 w-4" />
        <span className="rounded-md bg-secondary px-2 py-1">Lambda</span>
        <ArrowRight className="h-4 w-4" />
        <span className="rounded-md bg-secondary px-2 py-1">Bedrock</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ArchitectureItem
          icon={<Globe className="h-5 w-5" />}
          title="Frontend"
          description="React SPA hosted on GitHub Pages with responsive design"
        />
        <ArchitectureItem
          icon={<Server className="h-5 w-5" />}
          title="API Gateway"
          description="AWS HTTP API with CORS-enabled POST /chat route"
        />
        <ArchitectureItem
          icon={<Cloud className="h-5 w-5" />}
          title="Lambda Function"
          description="Node.js 22.x serverless function in eu-north-1"
        />
        <ArchitectureItem
          icon={<Cpu className="h-5 w-5" />}
          title="Amazon Bedrock"
          description="Titan Text Express v1 for natural language processing"
        />
      </div>

      <div className="mt-4 rounded-lg bg-secondary/50 p-3">
        <code className="text-xs text-muted-foreground font-mono">
          POST https://mjnq8gk6vh.execute-api.eu-north-1.amazonaws.com/prod/chat
        </code>
      </div>
    </div>
  );
}
