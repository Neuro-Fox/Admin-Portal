"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, User, Clock, Shield, Search } from "lucide-react"
import type { Tourist } from "@/lib/mockData"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), { ssr: false })

interface MapViewProps {
  tourists: Tourist[]
  onBoundsChange?: (bounds: any) => void
}

const createCustomIcon = (status: Tourist["status"]) => {
  if (typeof window === "undefined") return null

  const L = require("leaflet")

  const colors = {
    normal: "#3b82f6", // Blue
    alert: "#f59e0b", // Orange/Yellow
    sos: "#ef4444", // Red
  }

  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${colors[status]}" stroke="#fff" strokeWidth="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

export function MapView({ tourists, onBoundsChange }: MapViewProps) {
  const [isClient, setIsClient] = useState(false)
  const [mapProvider, setMapProvider] = useState("React-Leaflet")
  const [searchLocation, setSearchLocation] = useState("")
  const [clustersEnabled, setClustersEnabled] = useState(true)
  const [heatmapEnabled, setHeatmapEnabled] = useState(false)
  const [isLive, setIsLive] = useState(true)
  const [mapRef, setMapRef] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSearch = async () => {
    if (!searchLocation.trim() || !mapRef) return

    try {
      // Simple geocoding simulation - in real app, use Google/Mapbox geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        mapRef.setView([Number.parseFloat(lat), Number.parseFloat(lon)], 10)

        // Add a red marker at searched location
        const L = require("leaflet")
        const searchIcon = new L.Icon({
          iconUrl: `data:image/svg+xml;base64,${btoa(`
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ef4444" stroke="#fff" strokeWidth="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z"/>
              <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
            </svg>
          `)}`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })

        L.marker([Number.parseFloat(lat), Number.parseFloat(lon)], { icon: searchIcon })
          .addTo(mapRef)
          .bindPopup(`<b>Search Result</b><br/>${searchLocation}`)
          .openPopup()
      }
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  if (!isClient) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="size-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  // India center coordinates
  const indiaCenter: [number, number] = [20.5937, 78.9629]

  const renderMarkers = () => {
    const markers = tourists
      .map((tourist) => {
        const icon = createCustomIcon(tourist.status)
        if (!icon) return null

        return (
          <Marker key={tourist.id} position={tourist.location} icon={icon}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <User className="size-4 text-blue-600" />
                  <h3 className="font-semibold text-foreground">{tourist.name}</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={
                        tourist.status === "normal"
                          ? "default"
                          : tourist.status === "alert"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {tourist.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Safety Score:</span>
                    <div className="flex items-center gap-1">
                      <Shield className="size-3" />
                      <span className="font-medium">{tourist.safetyScore}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Ping:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span className="text-xs">{new Date(tourist.lastPing).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-xs font-mono">
                      {tourist.location[0].toFixed(4)}, {tourist.location[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })
      .filter(Boolean)

    if (clustersEnabled) {
      return <MarkerClusterGroup>{markers}</MarkerClusterGroup>
    }
    return markers
  }

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-wrap gap-4 items-center bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Provider</span>
          <Select value={mapProvider} onValueChange={setMapProvider}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Google Maps">Google Maps</SelectItem>
              <SelectItem value="Mapbox">Mapbox</SelectItem>
              <SelectItem value="React-Leaflet">React-Leaflet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Input
            placeholder="Search location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleSearch}>
            <Search className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Very ON</span>
            <Search className="size-4" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">Live</span>
            <Switch checked={isLive} onCheckedChange={setIsLive} />
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Clusters</span>
          <Switch checked={clustersEnabled} onCheckedChange={setClustersEnabled} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Heatmap</span>
          <Switch checked={heatmapEnabled} onCheckedChange={setHeatmapEnabled} />
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          height: 600px;
          width: 100%;
          border-radius: 0.5rem;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>

      <MapContainer
        center={indiaCenter}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
        className="rounded-lg border"
        ref={setMapRef}
        whenReady={() => {
          if (onBoundsChange && mapRef) {
            mapRef.on("moveend", () => {
              onBoundsChange(mapRef.getBounds())
            })
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {renderMarkers()}
      </MapContainer>
    </div>
  )
}
