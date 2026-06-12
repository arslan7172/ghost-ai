import { SignIn } from "@clerk/nextjs";
import { Users, Sparkles, Zap } from "lucide-react";

const features = [
  {
    Icon: Users,
    title: "Real-time collaboration",
    desc: "Work together with live cursors and presence.",
  },
  {
    Icon: Sparkles,
    title: "AI-powered assistance",
    desc: "Generate and refine diagrams with AI.",
  },
  {
    Icon: Zap,
    title: "Fast and intuitive",
    desc: "From idea to diagram in seconds.",
  },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-bg-surface flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-accent-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">G</span>
          </div>
          <span className="text-sm font-semibold text-foreground">Ghost AI</span>
        </div>

        {/* Hero + features */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              Design together,<br />build faster.
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              An AI-powered collaborative workspace for teams who move fast.
            </p>
          </div>
          <div className="space-y-5">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="h-9 w-9 rounded-lg bg-accent-primary-dim flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-faint">© 2025 Ghost AI. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 lg:w-1/2 bg-bg-base flex items-center justify-center p-8">
        <SignIn />
      </div>
    </div>
  );
}
