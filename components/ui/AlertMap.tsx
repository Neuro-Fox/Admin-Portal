"use client";

import { useRef, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, MapPin } from "lucide-react";

import "leaflet/dist/leaflet.css";

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

interface Alert {
  id: string;
  title: string;
  type: "Warning" | "Advisory" | "Emergency";
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

interface AlertsMapProps {
  onLocationSelect: (lat: number, lng: number, radius: number) => void;
  selectedLocation: { lat: number; lng: number; radius?: number } | null;
  existingAlerts: Alert[];
}

// Custom icons for different alert types
const alertIcons = {
  Warning: new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#FFA500"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <text x="12.5" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FFA500">!</text>
      </svg>
    `),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Advisory: new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#3B82F6"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <text x="12.5" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3B82F6">i</text>
      </svg>
    `),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Emergency: new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#EF4444"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <text x="12.5" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#EF4444">!</text>
      </svg>
    `),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

// Selected location icon
const selectedIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#10B981"/>
      <circle cx="12.5" cy="12.5" r="8" fill="white"/>
      <circle cx="12.5" cy="12.5" r="4" fill="#10B981"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapClickHandler({
  onLocationSelect,
  currentRadius,
}: {
  onLocationSelect: (lat: number, lng: number, radius: number) => void;
  currentRadius: number;
}) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng, currentRadius);
    },
  });
  return null;
}

function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 15);
  }, [map, center]);
  
  return null;
}

export function AlertsMap({
  onLocationSelect,
  selectedLocation,
  existingAlerts,
}: AlertsMapProps) {
  const mapRef = useRef<L.Map>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [radius, setRadius] = useState(selectedLocation?.radius || 1000);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);

  useEffect(() => {
    if (selectedLocation?.radius) {
      setRadius(selectedLocation.radius);
    }
  }, [selectedLocation]);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setMapCenter([lat, lng]);
    onLocationSelect(lat, lng, radius);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleRadiusChange = (newRadius: number[]) => {
    const radiusValue = newRadius[0];
    setRadius(radiusValue);
    if (selectedLocation) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng, radiusValue);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Search Controls */}
      <div className="p-4 border-b space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchLocation()}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button 
            onClick={searchLocation} 
            disabled={isSearching || !searchQuery.trim()}
            size="sm"
          >
            {isSearching ? "..." : "Search"}
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                className="p-2 text-sm border rounded cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                onClick={() => selectSearchResult(result)}
              >
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{result.display_name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Radius Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="radius-slider">Alert Radius</Label>
            <span className="text-sm text-gray-600">{radius.toLocaleString()} meters</span>
          </div>
          <Slider
            id="radius-slider"
            min={100}
            max={10000}
            step={100}
            value={[radius]}
            onValueChange={handleRadiusChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          ref={mapRef}
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
          <MapClickHandler onLocationSelect={onLocationSelect} currentRadius={radius} />

          {/* Selected location marker with radius circle */}
          {selectedLocation && (
            <>
              <Marker
                position={[selectedLocation.lat, selectedLocation.lng]}
                icon={selectedIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">Selected Location</h3>
                    <p className="text-sm">
                      Lat: {selectedLocation.lat.toFixed(6)}
                    </p>
                    <p className="text-sm">
                      Lng: {selectedLocation.lng.toFixed(6)}
                    </p>
                    <p className="text-sm">
                      Radius: {radius.toLocaleString()} meters
                    </p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[selectedLocation.lat, selectedLocation.lng]}
                radius={radius}
                pathOptions={{
                  fillColor: "#10B981",
                  fillOpacity: 0.2,
                  color: "#10B981",
                  weight: 2,
                }}
              />
            </>
          )}

          {/* Existing alerts markers */}
          {existingAlerts.map((alert) => (
            <Marker
              key={alert.id}
              position={[alert.latitude, alert.longitude]}
              icon={alertIcons[alert.type]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.type}</p>
                  <p className="text-sm mt-1">{alert.timestamp}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
