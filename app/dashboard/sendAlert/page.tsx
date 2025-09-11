"use client";

import { MapView } from "@/components/ui/MapView";
import { StatsCards } from "@/components/ui/StatsCards";

export default function SendAlertPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Map Container - Takes most of the space */}
      <div className="flex-1 min-h-0 p-4">
        <div className="h-full w-full rounded-lg border bg-card overflow-hidden">
          <MapView />
        </div>
      </div>

      {/* Stats Section - Fixed height at bottom */}
      <div className="flex-shrink-0 p-4 pt-0">
        <StatsCards />
      </div>
    </div>
  );
}
