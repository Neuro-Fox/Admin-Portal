import { NextResponse } from "next/server";

// Mock user location that changes slightly over time
export async function GET() {
  try {
    // Base location in NYC with slight random movement
    const baseLocation = {
      latitude: 40.7128 + (Math.random() - 0.5) * 0.001,
      longitude: -74.006 + (Math.random() - 0.5) * 0.001,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(baseLocation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user location" },
      { status: 500 }
    );
  }
}
