import type { ReactNode } from "react";
import { TopNav } from "./TopNav";

/**
 * App shell for the Kelder Club loyalty experience: a top navigation bar (Calzzapato
 * ecosystem) over an editorial, centered content column with generous whitespace.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-10">{children}</main>
    </div>
  );
}
