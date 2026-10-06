import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FlaskConical,
  History,
  Settings,
  FileSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/batch-lab", label: "Batch Lab", icon: FlaskConical },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full min-w-full bg-bg text-fg">
      <div className="flex min-h-screen w-full min-w-0">
        {/* Desktop Sidebar */}
        <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-border bg-sidebar max-md:hidden">
          <div className="px-5 pb-6 pt-7">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wider">
                AR
              </div>
              <div>
                <p className="font-display text-base font-bold leading-tight text-ink">ARES-EMD-OPAP</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Adaptive Stego Lab</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3">
            <div className="px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Core Modules
            </div>
            {NAV.map((item) => {
              const active = pathname === item.to || (item.to === "/batch-lab" && pathname === "/benchmark");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-fg",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="mt-6 px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Utilities
            </div>
            <Link
              to="/decoder"
              className={cn(
                "flex h-9 items-center gap-3 rounded-md px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)]",
                pathname === "/decoder"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-fg",
              )}
            >
              <FileSearch className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span>Standalone Decoder</span>
            </Link>
          </nav>

          <div className="border-t border-border p-4">
            <div className="rounded-lg bg-muted/50 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Statistical Engine</span>
              <p className="mt-0.5 text-[10px]">
                Friedman · Kendall’s W · Nemenyi Post-hoc with live empirical metrics.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Header & Main Container */}
        <div className="flex min-w-0 flex-1 flex-col w-full">
          {/* Mobile Top Navigation */}
          <nav className="flex items-center gap-1 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden">
            <div className="mr-2 flex items-center gap-1.5 pr-2 border-r border-border shrink-0">
              <span className="font-display font-bold text-sm text-primary">ARES</span>
            </div>
            {NAV.map((item) => {
              const active = pathname === item.to || (item.to === "/batch-lab" && pathname === "/benchmark");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "h-9 shrink-0 rounded-md px-3 text-xs font-medium flex items-center gap-1.5",
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-fg",
                  )}
                >
                  <item.icon className="size-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  kicker,
  description,
  actions,
}: {
  title: string;
  kicker: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between w-full">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {kicker}
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2 pt-1">{actions}</div>}
    </header>
  );
}
