import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto w-full max-w-[920px] px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        {children}
      </main>
      <Toaster position="bottom-right" offset={24} richColors closeButton={false} />
    </div>
  );
}
