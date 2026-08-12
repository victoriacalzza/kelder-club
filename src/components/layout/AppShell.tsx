import { useState, type ReactNode } from "react";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { QRModal } from "@/components/modals/QRModal";

/**
 * App shell for the Kelder Club loyalty experience: a top navigation bar on desktop and a
 * mobile bottom navigation with a central Pagar action. Content is an editorial, centered
 * column with generous whitespace and enough bottom padding to clear the mobile nav.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [pagarOpen, setPagarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-cream">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-6 md:pt-8 lg:px-8 lg:pb-10 lg:pt-10">
        {children}
      </main>
      <BottomNav onPagar={() => setPagarOpen(true)} />
      {pagarOpen && <QRModal onClose={() => setPagarOpen(false)} />}
    </div>
  );
}
