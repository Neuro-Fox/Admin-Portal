"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  denseAreas: number;
  unsecureAreas: number;
  totalTourists: number;
  lastUpdate: string;
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    denseAreas: 0,
    unsecureAreas: 0,
    totalTourists: 0,
    lastUpdate: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/tourists");
        const tourists = await response.json();

        // Calculate stats
        const totalTourists = tourists.length;
        const unsecureAreas = tourists.filter(
          (t: any) => t.safetyScore < 4
        ).length;
        const denseAreas = Math.floor(totalTourists / 10); // Rough estimate

        setStats({
          denseAreas,
          unsecureAreas,
          totalTourists,
          lastUpdate: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dense Areas</CardTitle>
          <div className="h-4 w-4 rounded-full bg-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.denseAreas}</div>
          <p className="text-xs text-muted-foreground">
            High tourist concentration
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unsecure Areas</CardTitle>
          <div className="h-4 w-4 rounded-full bg-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.unsecureAreas}</div>
          <p className="text-xs text-muted-foreground">Safety score below 4</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tourists</CardTitle>
          <div className="h-4 w-4 rounded-full bg-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTourists}</div>
          <p className="text-xs text-muted-foreground">Currently tracked</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Update</CardTitle>
          <div className="h-4 w-4 rounded-full bg-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lastUpdate}</div>
          <p className="text-xs text-muted-foreground">Data refresh time</p>
        </CardContent>
      </Card>
    </div>
  );
}
