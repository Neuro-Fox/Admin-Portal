"use client"

import { useState, useEffect } from "react"
import { MapView } from "@/components/MapView"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map } from "lucide-react"
import type { Tourist } from "@/lib/mockData"

export default function MapPage() {
  const [tourists, setTourists] = useState<Tourist[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [visibleTourists, setVisibleTourists] = useState<Tourist[]>([])

  const fetchTourists = async () => {
    try {
      const response = await fetch("/api/tourists")
      const data = await response.json()
      setTourists(data)
      setVisibleTourists(data)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch tourists:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTourists()

    const interval = setInterval(fetchTourists, 5000)
    return () => clearInterval(interval)
  }, [])

  const calculateStats = () => {
    const denseAreas = Math.ceil(visibleTourists.length / 50) // Rough calculation
    const unsecureAreas = visibleTourists.filter((t) => t.safetyScore < 50).length > 0 ? 1 : 0
    const totalTourists = visibleTourists.length

    return {
      denseAreas,
      unsecureAreas,
      totalTourists,
      lastUpdate: lastUpdate.toLocaleTimeString(),
    }
  }

  const stats = calculateStats()

  const handleBoundsChange = (bounds: any) => {
    if (!bounds) return

    const filtered = tourists.filter((tourist) => {
      const [lat, lng] = tourist.location
      return bounds.contains([lat, lng])
    })
    setVisibleTourists(filtered)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Map className="size-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-foreground">Tourist Location Map</h1>
        </div>
        <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Loading map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Map className="size-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-foreground">Tourist Location Map</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <MapView tourists={tourists} onBoundsChange={handleBoundsChange} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Stats</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dense Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.denseAreas}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unsecure Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.unsecureAreas}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tourists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalTourists}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">{stats.lastUpdate}</div>
              <div className="text-xs text-blue-500 mt-1">
                <div className="inline-block w-2 h-1 bg-blue-500 rounded animate-pulse mr-1"></div>
                Live
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
