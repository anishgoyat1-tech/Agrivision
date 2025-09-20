"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { Nav } from "@/components/nav";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/sign-in") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Leaf className="size-5" />
            </div>
            <h1 className="text-xl font-bold text-primary font-headline">AgriVision</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <Nav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30 md:static md:z-auto md:bg-transparent md:border-none">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Future: Breadcrumbs or Search */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
