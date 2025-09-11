"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, User, Clock, Shield, Search, X } from "lucide-react";
import type { Tourist } from "@/lib/mockData";

// Fixed: Import MapContainer with proper typing
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
) as any;

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), {
  ssr: false,
});

interface MapViewProps {
  tourists: Tourist[];
  onBoundsChange?: (bounds: any) => void;
}

// Fixed: Proper popup props interface
interface PopupProps {
  children: React.ReactNode;
}

const createCustomIcon = (status: Tourist["status"]) => {
  if (typeof window === "undefined") return null;

  const L = require("leaflet");

  const colors = {
    normal: "#3b82f6", // Blue
    alert: "#f59e0b", // Orange/Yellow
    sos: "#ef4444", // Red
  };

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
  });
};

export function MapView({ tourists, onBoundsChange }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapProvider, setMapProvider] = useState("React-Leaflet");
  const [searchLocation, setSearchLocation] = useState("");
  const [clustersEnabled, setClustersEnabled] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [mapRef, setMapRef] = useState<any>(null);
  const [searchMarker, setSearchMarker] = useState<any>(null);
  const [searchError, setSearchError] = useState<string>("");

  // Predefined locations for fallback search
  const predefinedLocations = {
    'delhi': { lat: 28.6139, lng: 77.209, name: 'New Delhi' },
    'mumbai': { lat: 19.076, lng: 72.8777, name: 'Mumbai' },
    'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
    'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru' },
    'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
    'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
    'jaipur': { lat: 26.9124, lng: 75.7873, name: 'Jaipur' },
    'goa': { lat: 15.2993, lng: 74.124, name: 'Goa' },
    'agra': { lat: 27.1767, lng: 78.0081, name: 'Agra' },
    'kerala': { lat: 10.8505, lng: 76.2711, name: 'Kerala' },
    'rajasthan': { lat: 27.0238, lng: 74.2179, name: 'Rajasthan' },
    'hyderabad': { lat: 17.385, lng: 78.4867, name: 'Hyderabad' },
    'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
    'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
    'lucknow': { lat: 26.8467, lng: 80.9462, name: 'Lucknow' }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async () => {
    if (!searchLocation.trim() || !mapRef) return;

    setSearchError("");

    try {
      // Clear previous search marker
      if (searchMarker) {
        mapRef.removeLayer(searchMarker);
        setSearchMarker(null);
      }

      let latitude: number;
      let longitude: number;
      let displayName: string;

      // Check if it's a predefined location first
      const searchKey = searchLocation.toLowerCase().trim();
      if (predefinedLocations[searchKey as keyof typeof predefinedLocations]) {
        const location = predefinedLocations[searchKey as keyof typeof predefinedLocations];
        latitude = location.lat;
        longitude = location.lng;
        displayName = location.name;
      } else {
        // Try to parse as coordinates (lat,lng)
        const coordMatch = searchLocation.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
        if (coordMatch) {
          latitude = Number.parseFloat(coordMatch[1]);
          longitude = Number.parseFloat(coordMatch[2]);
          displayName = `Coordinates: ${latitude}, ${longitude}`;
        } else {
          // Try external geocoding service with CORS proxy
          try {
            const response = await fetch(
              `https://api.allorigins.win/get?url=${encodeURIComponent(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                  searchLocation
                )}&limit=1`
              )}`
            );
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);

            if (data && data.length > 0) {
              latitude = Number.parseFloat(data[0].lat);
              longitude = Number.parseFloat(data[0].lon);
              displayName = data[0].display_name || searchLocation;
            } else {
              throw new Error("Location not found");
            }
          } catch {
            // If all else fails, provide helpful error
            const suggestions = Object.keys(predefinedLocations)
              .filter(city => city.includes(searchKey.substring(0, 3)))
              .slice(0, 3);
            
            const suggestionText = suggestions.length > 0 
              ? ` Try: ${suggestions.join(', ')}` 
              : ' Try cities like: Delhi, Mumbai, Bangalore';
            
            throw new Error(`Location not found.${suggestionText} or use coordinates (lat,lng)`);
          }
        }
      }

      // Move map to searched location
      mapRef.setView([latitude, longitude], 12);

      // Add a red marker at searched location
      const L = require("leaflet");
      const searchIcon = new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ef4444" stroke="#fff" strokeWidth="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z"/>
            <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
          </svg>
        `)}`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const marker = L.marker([latitude, longitude], {
        icon: searchIcon,
      });

      marker
        .addTo(mapRef)
        .bindPopup(`<b>Search Result</b><br/>${displayName}`)
        .openPopup();

      setSearchMarker(marker);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError(error instanceof Error ? error.message : "Search failed. Try using coordinates (lat,lng)");
    }
  };

  const clearSearch = () => {
    if (searchMarker && mapRef) {
      mapRef.removeLayer(searchMarker);
      setSearchMarker(null);
    }
    setSearchLocation("");
    setSearchError("");
  };

  if (!isClient) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="size-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  // India center coordinates
  const indiaCenter: [number, number] = [20.5937, 78.9629];

  const renderMarkers = () => {
    const markers = tourists
      .map((tourist) => {
        const icon = createCustomIcon(tourist.status);
        if (!icon) return null;
        
        const MarkerComponent = Marker as any;

        return (
          <MarkerComponent key={tourist.id} position={tourist.location} icon={icon}>
            {/* Fixed: Removed className prop from Popup */}
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <User className="size-4 text-blue-600" />
                  <h3 className="font-semibold text-foreground">
                    {tourist.name}
                  </h3>
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
                      <span className="font-medium">
                        {tourist.safetyScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Ping:</span>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span className="text-xs">
                        {new Date(tourist.lastPing).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-xs font-mono">
                      {tourist.location[0].toFixed(4)},{" "}
                      {tourist.location[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </MarkerComponent>
        );
      })
      .filter(Boolean);

    if (clustersEnabled) {
      return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
    }
    return markers;
  };

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
          <div className="flex-1 space-y-1">
            <div className="flex gap-2">
              <Input
                placeholder="Search location or coordinates (lat,lng)..."
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  if (searchError) setSearchError(""); // Clear error when typing
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSearch} disabled={!searchLocation.trim()}>
                <Search className="size-4" />
              </Button>
              {(searchLocation || searchMarker) && (
                <Button size="sm" variant="outline" onClick={clearSearch}>
                  <X className="size-4" />
                </Button>
              )}
            </div>
            {searchError && (
              <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                {searchError}
              </p>
            )}
          </div>
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
          <Switch
            checked={clustersEnabled}
            onCheckedChange={setClustersEnabled}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Heatmap</span>
          <Switch
            checked={heatmapEnabled}
            onCheckedChange={setHeatmapEnabled}
          />
        </div>
      </div>

      {/* Fixed: Moved style to a separate component or use CSS-in-JS properly */}
      <style jsx global>{`
        .leaflet-container {
          height: 600px;
          width: 100%;
          border-radius: 0.5rem;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
      `}</style>

      {/* Fixed: Added proper props to MapContainer */}
      <MapContainer
        center={indiaCenter}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
        className="rounded-lg border"
        ref={(map: any) => {
          setMapRef(map);
          if (onBoundsChange && map) {
            map.on("moveend", () => {
              onBoundsChange(map.getBounds());
            });
          }
        }}
      >
        <TileLayer
          {...({
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          } as any)}
        />

        {renderMarkers()}
      </MapContainer>
    </div>
  );
}
