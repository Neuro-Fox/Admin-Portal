import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for alerts (in production, you'd use a database)
let alerts: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const alertData = await request.json();
    
    // Validate required fields
    if (!alertData.title || !alertData.type || !alertData.message || 
        !alertData.latitude || !alertData.longitude || !alertData.radius) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new alert with timestamp and ID
    const newAlert = {
      id: Date.now().toString(),
      ...alertData,
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    // Add to storage
    alerts.push(newAlert);

    return NextResponse.json(newAlert, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return all alerts, sorted by timestamp (most recent first)
    const sortedAlerts = alerts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return NextResponse.json(sortedAlerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}
