import { StatsCards } from "@/components/StatsCards"
import { AlertsFeed } from "@/components/AlertsFeed"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-6">Dashboard Overview</h1>
        <StatsCards />
      </div>

      {/* Alerts Feed Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlertsFeed />
        </div>

        {/* Latest Activity Section */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-4">Latest Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Tourist check-in: Mumbai</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-orange-500"></div>
                <span className="text-muted-foreground">Alert resolved: Jaipur</span>
                <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500"></div>
                <span className="text-muted-foreground">SOS call: Kolkata</span>
                <span className="text-xs text-muted-foreground ml-auto">8m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">New tourist registered</span>
                <span className="text-xs text-muted-foreground ml-auto">12m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
