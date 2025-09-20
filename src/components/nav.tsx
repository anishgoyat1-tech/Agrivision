"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Bug, Droplets, LayoutDashboard, Leaf, LineChart, Mic } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crop-health", label: "Crop Health", icon: Leaf },
  { href: "/soil-water", label: "Soil & Water", icon: Droplets },
  { href: "/pest-disease", label: "Pest & Disease", icon: Bug },
  { href: "/yield-prediction", label: "Yield Prediction", icon: LineChart },
  { href: "/voice-assistant", label: "AI Assistant", icon: Mic },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className="w-full justify-start"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
