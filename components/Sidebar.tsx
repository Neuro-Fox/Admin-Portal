"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Map,
  FileText,
  Settings,
  Shield,
  Users,
  AlertTriangle,
  Phone,
  Search,
} from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { getDashboardStats } from "@/lib/mockData";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Map", href: "/dashboard/map", icon: Map },
  { name: "Send Alert", href: "/dashboard/sendAlert", icon: AlertTriangle },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Enquire", href: "/dashboard/enquire", icon: Search },
  {
    name: "Admin Alerts",
    href: "/dashboard/alerts",
    icon: AlertTriangle,
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const stats = getDashboardStats();

  // ✅ Prevent hydration mismatch
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Image
            src="/logo.png" // place your logo in /public
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h2 className="font-semibold text-sidebar-foreground">
              Police Monitor
            </h2>
            <p className="text-xs text-sidebar-foreground/70">
              Tourist Safety System
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="w-full"
              >
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        {/* Quick Stats Section */}
        <div className="px-2 py-4">
          <h3 className="text-xs font-medium text-sidebar-foreground/70 mb-3 uppercase tracking-wider">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-blue-500" />
                <span className="text-sm text-sidebar-foreground">
                  Total Tourists
                </span>
              </div>
              <span className="text-sm font-medium text-sidebar-foreground">
                {stats.totalTourists}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-orange-500" />
                <span className="text-sm text-sidebar-foreground">
                  Active Alerts
                </span>
              </div>
              <span className="text-sm font-medium text-sidebar-foreground">
                {stats.activeAlerts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-red-500" />
                <span className="text-sm text-sidebar-foreground">
                  SOS Pending
                </span>
              </div>
              <span className="text-sm font-medium text-sidebar-foreground">
                {stats.sosPending}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-green-500" />
                <span className="text-sm text-sidebar-foreground">
                  Resolved Cases
                </span>
              </div>
              <span className="text-sm font-medium text-sidebar-foreground">
                {stats.resolvedCases}
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2">
          {lastUpdated && (
            <p className="text-xs text-sidebar-foreground/50">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
