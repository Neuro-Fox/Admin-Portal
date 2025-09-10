"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@googlemaps/js-api-loader";

// Update interfaces to match Google Maps types
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

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const userLocationMarkerRef = useRef<google.maps.Marker | null>(null);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(
    null
  );
  const searchMarkerRef = useRef<google.maps.Marker | null>(null);

  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [clusters, setClusters] = useState<MapCluster[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [showClusters, setShowClusters] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapProvider, setMapProvider] = useState("google");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current || isMapLoaded) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["visualization", "geometry"],
    });

    loader
      .load()
      .then(() => {
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 40.7128, lng: -74.006 },
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        mapInstanceRef.current = map;
        setIsMapLoaded(true);
      })
      .catch((e) => {
        console.error("Error loading Google Maps:", e);
      });
  }, [isMapLoaded]);

  // Rest of your code remains the same...

  return (
    <div className="relative h-full w-full">
      {/* Controls Overlay */}
      <Card className="absolute top-4 left-4 z-10 w-80">
        {/* Rest of your JSX remains the same... */}
      </Card>

      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}

// Helper function remains the same...
