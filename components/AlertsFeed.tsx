"use client"

import { AlertTriangle, MapPin, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { alerts, getTouristById } from "@/lib/mockData"

const alertTypeColors = {
  "Restricted Area": "bg-red-100 text-red-800 border-red-200",
  "Location Missing": "bg-orange-100 text-orange-800 border-orange-200",
  "Stationary > 1 Day": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Path Deviation": "bg-blue-100 text-blue-800 border-blue-200",
}

export function AlertsFeed() {
  const recentAlerts = alerts.slice(0, 5) // Show latest 5 alerts

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-orange-500" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => {
            const tourist = getTouristById(alert.touristId)
            return (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="size-4 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={alertTypeColors[alert.type]}>
                      {alert.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>{tourist?.name || "Unknown Tourist"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      <span>
                        {alert.location[0].toFixed(4)}, {alert.location[1].toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {recentAlerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="size-8 mx-auto mb-2 opacity-50" />
              <p>No recent alerts</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
