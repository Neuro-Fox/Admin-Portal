"use client";

import { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

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

interface AlertsMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
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
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function AlertsMap({
  onLocationSelect,
  selectedLocation,
  existingAlerts,
}: AlertsMapProps) {
  const mapRef = useRef<L.Map>(null);

  return (
    <div className="h-full w-full">
      <MapContainer
        ref={mapRef}
        center={[40.7128, -74.006]} // NYC default
        zoom={12}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />

        {/* Selected location marker */}
        {selectedLocation && (
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
              </div>
            </Popup>
          </Marker>
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
  );
}
