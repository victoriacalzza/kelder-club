import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

/**
 * Responsive app shell. Web-first: a fixed left sidebar on desktop (lg+) with the
 * content in a centered max-width column; on mobile it collapses to a bottom nav.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream lg:flex">
      <Sidebar />
      <div className="flex-1 pb-24 lg:pb-0">
        <main className="mx-auto w-full max-w-6xl px-5 py-6 lg:px-10 lg:py-10">{children}</main>
      </div>
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
