"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Activity, Grid, Map, Wifi, WifiOff } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Shield, MapPin } from "lucide-react";
import { useTouristContext } from "@/lib/TouristContext";
import { getSafetyMarkerColor } from "@/lib/utils/mapUtils";

// Define the LayerManager component
interface LayerManagerProps {
  tourists: Tourist[];
  showHeatmap: boolean;
  showClusters: boolean;
  heatmapLayer: any;
  clusterLayer: any;
}

function LayerManager({
  tourists,
  showHeatmap,
  showClusters,
  heatmapLayer,
  clusterLayer,
}: LayerManagerProps) {
  const map = useMap();

  useEffect(() => {
    // Early return if layers aren't initialized yet
    if (!heatmapLayer || !clusterLayer) return;

    try {
      // Configure heatmap layer
      if (showHeatmap && tourists.length > 0) {
        const heatmapData = tourists.map((tourist) => [
          tourist.latitude,
          tourist.longitude,
          1, // Use constant intensity for better visibility
        ]);

        // Only set options once when layer is created, not every time
        if (!map.hasLayer(heatmapLayer)) {
          map.addLayer(heatmapLayer);
        }
        // Update data
        heatmapLayer.setLatLngs(heatmapData);
      } else if (!showHeatmap && map.hasLayer(heatmapLayer)) {
        map.removeLayer(heatmapLayer);
      }

      // Configure cluster layer
      if (showClusters && tourists.length > 0) {
        clusterLayer.clearLayers();
        tourists.forEach((tourist) => {
          const marker = L.circleMarker([tourist.latitude, tourist.longitude], {
            radius: 10,
            fillColor: getSafetyMarkerColor(tourist.safetyScore),
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).bindPopup(`
            <div class="p-2">
              <p class="font-semibold">Tourist ID: ${tourist.id}</p>
              <p class="text-sm">Safety Score: ${tourist.safetyScore}</p>
              <p class="text-sm text-gray-600">
                ${new Date(tourist.timestamp).toLocaleString()}
              </p>
            </div>
          `);
          clusterLayer.addLayer(marker);
        });

        if (!map.hasLayer(clusterLayer)) {
          map.addLayer(clusterLayer);
        }
      } else if (!showClusters && map.hasLayer(clusterLayer)) {
        map.removeLayer(clusterLayer);
      }

      // Fit bounds to show all markers (only if we have data)
      if (tourists.length > 0 && (showHeatmap || showClusters)) {
        const bounds = L.latLngBounds(
          tourists.map((t) => [t.latitude, t.longitude])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error("Error updating map layers:", error);
    }
  }, [tourists, showHeatmap, showClusters, map, heatmapLayer, clusterLayer]);

  return null;
}

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Tourist {
  id: string;
  latitude: number;
  longitude: number;
  safetyScore: number;
  timestamp: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface MapCluster {
  id: string;
  latitude: number;
  longitude: number;
  count: number;
  avgSafetyScore: number;
  touristIds: string[];
}

function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [map, center]);

  return null;
}

function MapInitializer({
  heatmapLayerRef,
  markerClusterGroupRef,
}: {
  heatmapLayerRef: React.MutableRefObject<any>;
  markerClusterGroupRef: React.MutableRefObject<any>;
}) {
  const map = useMap();

  useEffect(() => {
    // Initialize heatmap layer with proper configuration
    if (!heatmapLayerRef.current) {
      const initialData = [[0, 0, 0]]; // Initial data point
      const heat = (L as any).heatLayer(initialData, {
        radius: 30,
        blur: 20,
        maxZoom: 15,
        max: 1.0,
        minOpacity: 0.4,
        gradient: {
          0.4: "#2563eb", // blue
          0.6: "#22c55e", // green
          0.8: "#eab308", // yellow
          1.0: "#ef4444", // red
        },
      });
      heatmapLayerRef.current = heat;
      // Don't add to map yet - let LayerManager handle it
    }

    // Initialize marker cluster group
    if (!markerClusterGroupRef.current) {
      const cluster = (L as any).markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: function (cluster: any) {
          const count = cluster.getChildCount();
          let className = "marker-cluster-";

          if (count < 10) {
            className += "small";
          } else if (count < 100) {
            className += "medium";
          } else {
            className += "large";
          }

          return new L.DivIcon({
            html: `<div><span>${count}</span></div>`,
            className: className,
            iconSize: new L.Point(40, 40),
          });
        },
      });
      markerClusterGroupRef.current = cluster;
      // Don't add to map yet - let LayerManager handle it
    }

    return () => {
      // Cleanup on unmount
      if (heatmapLayerRef.current && map.hasLayer(heatmapLayerRef.current)) {
        map.removeLayer(heatmapLayerRef.current);
      }
      if (
        markerClusterGroupRef.current &&
        map.hasLayer(markerClusterGroupRef.current)
      ) {
        map.removeLayer(markerClusterGroupRef.current);
      }
    };
  }, [map]);

  return null;
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export function MapView() {
  const { tourists, connectionStatus } = useTouristContext();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [clusters, setClusters] = useState<MapCluster[]>([]);
  const [showClusters, setShowClusters] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    28.6139,
    77.209, // Delhi, India coordinates
  ]);
  const heatmapLayerRef = useRef<any>(null);
  const markerClusterGroupRef = useRef<any>(null);

  // Search location
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Controls Overlay */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end space-y-4">
        {/* Toggle Controls Card */}
        <Card className="shadow-lg bg-white/95 backdrop-blur-sm border-0 rounded-lg">
          <CardContent className="p-2">
            <ToggleGroup
              type="multiple"
              className="gap-1.5"
              aria-label="Map View Options"
              value={[
                ...(showClusters ? ["clusters"] : []),
                ...(showHeatmap ? ["heatmap"] : []),
              ]}
              onValueChange={(values) => {
                setShowClusters(values.includes("clusters"));
                setShowHeatmap(values.includes("heatmap"));
              }}
            >
              <ToggleGroupItem
                value="clusters"
                aria-label="Show Clusters"
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium data-[state=on]:bg-blue-500 data-[state=on]:text-white hover:bg-blue-100 transition-colors"
              >
                <Grid className="h-4 w-4" />
                <span>Clusters</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="heatmap"
                aria-label="Show Heatmap"
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium data-[state=on]:bg-red-500 data-[state=on]:text-white hover:bg-red-100 transition-colors"
              >
                <Map className="h-4 w-4" />
                <span>Heatmap</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={12}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenter center={mapCenter} />
        <MapInitializer
          heatmapLayerRef={heatmapLayerRef}
          markerClusterGroupRef={markerClusterGroupRef}
        />

        {/* Update layers when data changes */}
        <LayerManager
          tourists={tourists}
          showHeatmap={showHeatmap}
          showClusters={showClusters}
          heatmapLayer={heatmapLayerRef.current}
          clusterLayer={markerClusterGroupRef.current}
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              <div className="p-2">
                <p className="font-semibold">Current Location</p>
                <p className="text-sm text-gray-600">
                  {new Date(userLocation.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
