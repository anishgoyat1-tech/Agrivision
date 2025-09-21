"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Bug, Droplets, LayoutDashboard, Leaf, LineChart, Mic, FileText, Tractor } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function Nav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language].nav;

  const navItems = [
    { href: "/", label: t.dashboard, icon: LayoutDashboard },
    { href: "/farm-settings", label: t.farmSettings, icon: Tractor },
    { href: "/crop-health", label: t.cropHealth, icon: Leaf },
    { href: "/soil-water", label: t.soilWater, icon: Droplets },
    { href: "/pest-disease", label: t.pestDisease, icon: Bug },
    { href: "/yield-prediction", label: t.yieldPrediction, icon: LineChart },
    { href: "/reports", label: t.reports, icon: FileText },
    { href: "/voice-assistant", label: t.aiAssistant, icon: Mic },
  ];
  

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
