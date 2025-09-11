"use client";

import { AlertForm } from "@/components/ui/AlertForm";
import { AlertsMap } from "@/components/ui/AlertMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface Alert {
  id: string;
  title: string;
  type: "Warning" | "Advisory" | "Emergency";
  message: string;
  latitude: number;
  longitude: number;
  radius?: number;
  timestamp: string;
  status: "active" | "sent" | "expired";
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    radius?: number;
  } | null>(null);

  // Fetch existing alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("/api/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const handleLocationSelect = (lat: number, lng: number, radius: number) => {
    setSelectedLocation({ lat, lng, radius });
  };

  const handleAlertCreated = (newAlert: Alert) => {
    setAlerts((prev) => [newAlert, ...prev]);
    setSelectedLocation(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Alert Form */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Create Alert</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <AlertForm
                selectedLocation={selectedLocation}
                onAlertCreated={handleAlertCreated}
              />
            </CardContent>
          </Card>

          {/* Map for Location Selection */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Select Target Location</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <AlertsMap
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                  existingAlerts={alerts}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="flex-shrink-0 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No alerts created yet
                </p>
              ) : (
                alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.type} •{" "}
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs ${
                        alert.status === "active"
                          ? "bg-green-100 text-green-800"
                          : alert.status === "sent"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {alert.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
