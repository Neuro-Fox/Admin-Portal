"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTouristContext } from "@/lib/TouristContext";
import { Wifi, WifiOff } from "lucide-react";

export function StatsCards() {
  const { stats, connectionStatus } = useTouristContext();

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
          {connectionStatus === "connected" ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lastUpdate}</div>
          <p className="text-xs text-muted-foreground">
            {connectionStatus === "connected"
              ? "Live updates"
              : connectionStatus === "error"
              ? "Connection error"
              : "Disconnected"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
