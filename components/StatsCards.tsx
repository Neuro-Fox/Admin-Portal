"use client"

import { Users, AlertTriangle, Phone, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/mockData"

export function StatsCards() {
  const stats = getDashboardStats()

  const statsData = [
    {
      title: "Total Tourists",
      value: stats.totalTourists,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Currently monitored",
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Require attention",
    },
    {
      title: "SOS Pending",
      value: stats.sosPending,
      icon: Phone,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Emergency calls",
    },
    {
      title: "Resolved Cases",
      value: stats.resolvedCases,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Successfully handled",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
