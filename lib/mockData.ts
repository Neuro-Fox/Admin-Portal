// Combined mock data for Tourism Safety and Police Monitoring Dashboard

// Existing interfaces
export interface Tourist {
  id: string;
  latitude: number;
  longitude: number;
  safetyScore: number;
  timestamp: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  type: "Warning" | "Advisory" | "Emergency";
  message: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: "active" | "sent" | "expired";
}

// New interfaces from Police Monitoring Dashboard
export interface MonitoredTourist {
  id: string;
  name: string;
  location: [number, number]; // [lat, lng]
  lastPing: string;
  safetyScore: number;
  status: "normal" | "alert" | "sos";
}

export interface PoliceAlert {
  id: string;
  type:
    | "Restricted Area"
    | "Location Missing"
    | "Stationary > 1 Day"
    | "Path Deviation";
  timestamp: string;
  location: [number, number];
  touristId: string;
}

export interface SOSReport {
  id: string;
  touristId: string;
  status: "pending" | "resolved";
  raisedAt: string;
  resolved?: string;
}

export interface BlockchainUser {
  id: string;
  touristId: string;
  kycData: {
    fullName: string;
    passportNumber: string;
    nationality: string;
    age: number;
  };
  itinerary: {
    destination: string;
    checkIn: string;
    checkOut: string;
    purpose: string;
  };
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
}

// Mock tourist data generator (existing)
export const generateMockTourists = (): Tourist[] => {
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

// Mock user location generator (existing)
export const generateMockUserLocation = (): UserLocation => {
  return {
    latitude: 40.7128 + (Math.random() - 0.5) * 0.001,
    longitude: -74.006 + (Math.random() - 0.5) * 0.001,
    timestamp: new Date().toISOString(),
  };
};

// Mock alerts data (existing tourism alerts)
export const alerts: Alert[] = [
  {
    id: "alert-1",
    title: "Heavy Traffic Alert",
    type: "Warning",
    message:
      "Heavy traffic reported in Times Square area. Consider alternative routes.",
    latitude: 40.758,
    longitude: -73.9855,
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: "sent",
  },
  {
    id: "alert-2",
    title: "Weather Advisory",
    type: "Advisory",
    message: "Light rain expected in Central Park area. Carry umbrellas.",
    latitude: 40.7829,
    longitude: -73.9654,
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    status: "active",
  },
];

// New mock data from Police Monitoring Dashboard

// Mock monitored tourists data
export const monitoredTourists: MonitoredTourist[] = [
  {
    id: "T001",
    name: "John Smith",
    location: [28.6139, 77.209], // New Delhi
    lastPing: "2024-01-15T10:30:00Z",
    safetyScore: 85,
    status: "normal",
  },
  {
    id: "T002",
    name: "Emma Johnson",
    location: [19.076, 72.8777], // Mumbai
    lastPing: "2024-01-15T09:45:00Z",
    safetyScore: 45,
    status: "alert",
  },
  {
    id: "T003",
    name: "Michael Brown",
    location: [12.9716, 77.5946], // Bangalore
    lastPing: "2024-01-15T11:15:00Z",
    safetyScore: 92,
    status: "normal",
  },
  {
    id: "T004",
    name: "Sarah Davis",
    location: [22.5726, 88.3639], // Kolkata
    lastPing: "2024-01-15T08:20:00Z",
    safetyScore: 25,
    status: "sos",
  },
  {
    id: "T005",
    name: "David Wilson",
    location: [13.0827, 80.2707], // Chennai
    lastPing: "2024-01-15T10:00:00Z",
    safetyScore: 78,
    status: "normal",
  },
  {
    id: "T006",
    name: "Lisa Anderson",
    location: [26.9124, 75.7873], // Jaipur
    lastPing: "2024-01-15T07:30:00Z",
    safetyScore: 35,
    status: "alert",
  },
  {
    id: "T007",
    name: "Robert Taylor",
    location: [15.2993, 74.124], // Goa
    lastPing: "2024-01-15T11:45:00Z",
    safetyScore: 88,
    status: "normal",
  },
  {
    id: "T008",
    name: "Jennifer Martinez",
    location: [27.1767, 78.0081], // Agra
    lastPing: "2024-01-15T09:15:00Z",
    safetyScore: 15,
    status: "sos",
  },
];

// Mock police alerts data
export const policeAlerts: PoliceAlert[] = [
  {
    id: "A001",
    type: "Restricted Area",
    timestamp: "2024-01-15T09:45:00Z",
    location: [19.076, 72.8777],
    touristId: "T002",
  },
  {
    id: "A002",
    type: "Location Missing",
    timestamp: "2024-01-15T08:20:00Z",
    location: [22.5726, 88.3639],
    touristId: "T004",
  },
  {
    id: "A003",
    type: "Stationary > 1 Day",
    timestamp: "2024-01-15T07:30:00Z",
    location: [26.9124, 75.7873],
    touristId: "T006",
  },
  {
    id: "A004",
    type: "Path Deviation",
    timestamp: "2024-01-15T09:15:00Z",
    location: [27.1767, 78.0081],
    touristId: "T008",
  },
  {
    id: "A005",
    type: "Restricted Area",
    timestamp: "2024-01-15T10:45:00Z",
    location: [28.6139, 77.209],
    touristId: "T001",
  },
];

// Mock SOS reports data
export const sosReports: SOSReport[] = [
  {
    id: "SOS001",
    touristId: "T004",
    status: "pending",
    raisedAt: "2024-01-15T08:20:00Z",
  },
  {
    id: "SOS002",
    touristId: "T008",
    status: "pending",
    raisedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "SOS003",
    touristId: "T006",
    status: "resolved",
    raisedAt: "2024-01-14T15:30:00Z",
    resolved: "2024-01-14T18:45:00Z",
  },
];

// Mock blockchain users data
export const blockchainUsers: BlockchainUser[] = [
  {
    id: "BC001",
    touristId: "T001",
    kycData: {
      fullName: "John Smith",
      passportNumber: "US123456789",
      nationality: "United States",
      age: 32,
    },
    itinerary: {
      destination: "Golden Triangle Tour",
      checkIn: "2024-01-10",
      checkOut: "2024-01-20",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Jane Smith",
        relationship: "Spouse",
        phone: "+1-555-0123",
      },
    ],
  },
  {
    id: "BC002",
    touristId: "T002",
    kycData: {
      fullName: "Emma Johnson",
      passportNumber: "UK987654321",
      nationality: "United Kingdom",
      age: 28,
    },
    itinerary: {
      destination: "Mumbai Business Trip",
      checkIn: "2024-01-12",
      checkOut: "2024-01-18",
      purpose: "Business",
    },
    emergencyContacts: [
      {
        name: "Tom Johnson",
        relationship: "Brother",
        phone: "+44-20-7946-0958",
      },
    ],
  },
  {
    id: "BC003",
    touristId: "T003",
    kycData: {
      fullName: "Michael Brown",
      passportNumber: "CA456789123",
      nationality: "Canada",
      age: 35,
    },
    itinerary: {
      destination: "Tech Conference Bangalore",
      checkIn: "2024-01-14",
      checkOut: "2024-01-17",
      purpose: "Conference",
    },
    emergencyContacts: [
      {
        name: "Sarah Brown",
        relationship: "Wife",
        phone: "+1-416-555-0199",
      },
    ],
  },
  {
    id: "BC004",
    touristId: "T004",
    kycData: {
      fullName: "Sarah Davis",
      passportNumber: "AU789123456",
      nationality: "Australia",
      age: 26,
    },
    itinerary: {
      destination: "Cultural Heritage Tour",
      checkIn: "2024-01-13",
      checkOut: "2024-01-22",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Mark Davis",
        relationship: "Father",
        phone: "+61-2-9876-5432",
      },
      {
        name: "Lisa Davis",
        relationship: "Mother",
        phone: "+61-2-9876-5433",
      },
    ],
  },
  {
    id: "BC005",
    touristId: "T005",
    kycData: {
      fullName: "David Wilson",
      passportNumber: "DE321654987",
      nationality: "Germany",
      age: 41,
    },
    itinerary: {
      destination: "South India Temple Tour",
      checkIn: "2024-01-11",
      checkOut: "2024-01-19",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Anna Wilson",
        relationship: "Wife",
        phone: "+49-30-12345678",
      },
    ],
  },
  {
    id: "BC006",
    touristId: "T006",
    kycData: {
      fullName: "Lisa Anderson",
      passportNumber: "SE654987321",
      nationality: "Sweden",
      age: 29,
    },
    itinerary: {
      destination: "Rajasthan Desert Safari",
      checkIn: "2024-01-09",
      checkOut: "2024-01-16",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Erik Anderson",
        relationship: "Brother",
        phone: "+46-8-123-456-78",
      },
    ],
  },
  {
    id: "BC007",
    touristId: "T007",
    kycData: {
      fullName: "Robert Taylor",
      passportNumber: "FR987321654",
      nationality: "France",
      age: 38,
    },
    itinerary: {
      destination: "Goa Beach Holiday",
      checkIn: "2024-01-12",
      checkOut: "2024-01-19",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Marie Taylor",
        relationship: "Wife",
        phone: "+33-1-42-86-83-26",
      },
    ],
  },
  {
    id: "BC008",
    touristId: "T008",
    kycData: {
      fullName: "Jennifer Martinez",
      passportNumber: "ES159753486",
      nationality: "Spain",
      age: 31,
    },
    itinerary: {
      destination: "Taj Mahal & Agra Fort",
      checkIn: "2024-01-14",
      checkOut: "2024-01-16",
      purpose: "Tourism",
    },
    emergencyContacts: [
      {
        name: "Carlos Martinez",
        relationship: "Husband",
        phone: "+34-91-123-45-67",
      },
    ],
  },
];

// Helper functions for dashboard stats
export const getDashboardStats = () => {
  const totalTourists = monitoredTourists.length;
  const activeAlerts = policeAlerts.length;
  const sosPending = sosReports.filter(
    (report) => report.status === "pending"
  ).length;
  const resolvedCases = sosReports.filter(
    (report) => report.status === "resolved"
  ).length;

  return {
    totalTourists,
    activeAlerts,
    sosPending,
    resolvedCases,
  };
};

// Helper function to get monitored tourist by ID
export const getMonitoredTouristById = (
  id: string
): MonitoredTourist | undefined => {
  return monitoredTourists.find((tourist) => tourist.id === id);
};

// Helper function to get tourist by ID (used in AlertsFeed)
export const getTouristById = (id: string): MonitoredTourist | undefined => {
  return monitoredTourists.find((tourist) => tourist.id === id);
};

// Helper function to get blockchain user by tourist ID
export const getBlockchainUserByTouristId = (
  touristId: string
): BlockchainUser | undefined => {
  return blockchainUsers.find((user) => user.touristId === touristId);
};
