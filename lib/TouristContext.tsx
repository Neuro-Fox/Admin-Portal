"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface Tourist {
  id: string;
  latitude: number;
  longitude: number;
  safetyScore: number;
  timestamp: string;
}

export interface MapStats {
  denseAreas: number;
  unsecureAreas: number;
  totalTourists: number;
  lastUpdate: string;
}

interface TouristContextType {
  tourists: Tourist[];
  stats: MapStats;
  connectionStatus: "connected" | "disconnected" | "error";
}

const TouristContext = createContext<TouristContextType | null>(null);

export function TouristProvider({ children }: { children: React.ReactNode }) {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [stats, setStats] = useState<MapStats>({
    denseAreas: 0,
    unsecureAreas: 0,
    totalTourists: 0,
    lastUpdate: new Date().toLocaleTimeString(),
  });
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "error"
  >("disconnected");
  const eventSourceRef = useRef<EventSource | null>(null);

  // Calculate stats based on tourist data
  const calculateStats = (tourists: Tourist[]): MapStats => {
    // Calculate dense areas (areas with more than 5 tourists within 100m)
    const denseAreas = new Set();
    tourists.forEach((t1) => {
      const nearbyTourists = tourists.filter((t2) => {
        const distance = calculateDistance(
          t1.latitude,
          t1.longitude,
          t2.latitude,
          t2.longitude
        );
        return distance <= 0.1; // 100 meters
      });
      if (nearbyTourists.length >= 5) {
        denseAreas.add(
          `${Math.round(t1.latitude)},${Math.round(t1.longitude)}`
        );
      }
    });

    // Calculate unsecure areas (areas with average safety score below 40)
    const unsecureAreas = new Set(
      tourists
        .filter((t) => t.safetyScore < 40)
        .map((t) => `${Math.round(t.latitude)},${Math.round(t.longitude)}`)
    );

    return {
      denseAreas: denseAreas.size,
      unsecureAreas: unsecureAreas.size,
      totalTourists: tourists.length,
      lastUpdate: new Date().toLocaleTimeString(),
    };
  };

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

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 3000;

    const connectSSE = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      try {
        eventSourceRef.current = new EventSource("/api/tourists");

        eventSourceRef.current.onopen = () => {
          console.log("SSE connection established");
          setConnectionStatus("connected");
          retryCount = 0;
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setTourists((prevTourists) => {
              const updatedTourists = [...prevTourists];

              Object.entries(data).forEach(
                ([touristId, touristData]: [string, any]) => {
                  const newTourist: Tourist = {
                    id: touristId,
                    latitude: touristData.lat,
                    longitude: touristData.lon,
                    timestamp: touristData.timestamp,
                    safetyScore: 100, // Default safety score
                  };

                  const index = updatedTourists.findIndex(
                    (t) => t.id === touristId
                  );
                  if (index !== -1) {
                    updatedTourists[index] = newTourist;
                  } else {
                    updatedTourists.push(newTourist);
                  }
                }
              );

              return updatedTourists;
            });
          } catch (error) {
            console.error("Error processing SSE message:", error);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.error(`SSE connection error:`, error);
          setConnectionStatus("error");

          if (retryCount < maxRetries) {
            console.log(
              `Retrying connection in ${retryDelay}ms... (Attempt ${
                retryCount + 1
              }/${maxRetries})`
            );
            eventSourceRef.current?.close();
            setTimeout(() => {
              retryCount++;
              connectSSE();
            }, retryDelay);
          } else {
            console.error(
              "Max retry attempts reached. Please check server connection."
            );
            setConnectionStatus("disconnected");
          }
        };
      } catch (error) {
        console.error("Error creating EventSource:", error);
        setConnectionStatus("error");
      }
    };

    connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Update stats whenever tourists data changes
  useEffect(() => {
    setStats(calculateStats(tourists));
  }, [tourists]);

  return (
    <TouristContext.Provider value={{ tourists, stats, connectionStatus }}>
      {children}
    </TouristContext.Provider>
  );
}

export function useTouristContext() {
  const context = useContext(TouristContext);
  if (!context) {
    throw new Error("useTouristContext must be used within a TouristProvider");
  }
  return context;
}
