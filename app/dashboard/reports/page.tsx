"use client"
import { ReportsTable, type ReportItem } from "@/components/ReportsTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Phone, TrendingUp } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { getContract } from "@/components/ether"

export default function ReportsPage() {
  const stats = { totalTourists: 0, activeAlerts: 0, sosPending: 0, resolvedCases: 0 }
  const totalReports = 0
  const pendingSOS = 0
  const resolvedSOS = 0
  const [chainReports, setChainReports] = useState<ReportItem[]>([])
  const [lastSeenBlock, setLastSeenBlock] = useState<number | null>(null)

    let contract = getContract()
    
    const handler = (
      userAddress: string,
      name: string,
      homeAddress: string,
      phoneNumber: string,
      aadhar: string,
      passport: string,
      alertMessage: string,
      latitude: bigint,
      longitude: bigint,
      timestamp: bigint
    ) => {
      console.log("AlertEvent", userAddress, name, homeAddress, phoneNumber, aadhar, passport, alertMessage, latitude, longitude, timestamp)
      const id = `${userAddress}-${timestamp.toString()}`
      const item: ReportItem = {
        id,
        type: "alert",
        touristId: userAddress,
        touristName: name || "Unknown Tourist",
        alertMessage: alertMessage || "On-chain Alert",
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        status: "active",
        location: [Number(latitude), Number(longitude)],
        phoneNumber,
        aadhar,
        passport,
        homeAddress,
      }
      setChainReports((prev) => {
        if (prev.some((r) => r.id === id)) return prev
        return [item, ...prev]
      })
    }

    // live stream
    try {
      contract.on("AlertEvent", handler)
    } catch (err) {
      console.warn("Live subscription failed:", err)
    }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="size-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-foreground">Reports & Incidents</h1>
      </div>

      {/* Reports Stats - hidden when using only on-chain stream */}
      <div className="grid gap-4 md:grid-cols-4 hidden"></div>

      {/* Reports Table */}
      <ReportsTable externalItems={chainReports} />
    </div>
  )
}
