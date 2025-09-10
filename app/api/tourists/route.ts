import { NextResponse } from "next/server";

// Mock tourist data
const generateMockTourists = () => {
  const tourists = [];
  const baseLocations = [
    { lat: 40.7128, lng: -74.006 }, // NYC
    { lat: 40.7589, lng: -73.9851 }, // Times Square
    { lat: 40.7505, lng: -73.9934 }, // Herald Square
    { lat: 40.7614, lng: -73.9776 }, // Central Park
    { lat: 40.7282, lng: -74.0776 }, // Battery Park
  ];

  for (let i = 0; i < 50; i++) {
    const baseLocation =
      baseLocations[Math.floor(Math.random() * baseLocations.length)];

    tourists.push({
      id: `tourist-${i + 1}`,
      latitude: baseLocation.lat + (Math.random() - 0.5) * 0.02,
      longitude: baseLocation.lng + (Math.random() - 0.5) * 0.02,
      safetyScore: Math.floor(Math.random() * 10) + 1,
      timestamp: new Date().toISOString(),
    });
  }

  return tourists;
};

export async function GET() {
  try {
    const tourists = generateMockTourists();
    return NextResponse.json(tourists);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tourists data" },
      { status: 500 }
    );
  }
}
