// Extended mock data for tourist enquiry system

export interface TouristDetails {
  digitalId: string
  name: string
  phoneNumber: string
  aadhaarNo: string
  travelItinerary: {
    startDate: string
    endDate: string
    destinations: string[]
    purpose: string
    accommodations: {
      name: string
      location: string
      checkIn: string
      checkOut: string
    }[]
  }
}

export interface MovementData {
  id: string
  digitalId: string
  timestamp: string
  location: {
    lat: number
    lng: number
    address: string
    city: string
    state: string
  }
  activity: string
  transportMode?: "walking" | "taxi" | "bus" | "train" | "flight" | "metro"
}

// Mock tourist details for enquiry
export const touristDetails: TouristDetails[] = [
  {
    digitalId: "DID001",
    name: "John Smith",
    phoneNumber: "+1-555-0123",
    aadhaarNo: "XXXX-XXXX-1234",
    travelItinerary: {
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      destinations: ["New Delhi", "Agra", "Jaipur"],
      purpose: "Tourism - Golden Triangle Tour",
      accommodations: [
        {
          name: "Hotel Imperial",
          location: "Connaught Place, New Delhi",
          checkIn: "2024-01-10",
          checkOut: "2024-01-13",
        },
        {
          name: "Taj Hotel & Convention Centre",
          location: "Taj Ganj, Agra",
          checkIn: "2024-01-13",
          checkOut: "2024-01-16",
        },
        {
          name: "Rambagh Palace",
          location: "Bhawani Singh Road, Jaipur",
          checkIn: "2024-01-16",
          checkOut: "2024-01-20",
        },
      ],
    },
  },
  {
    digitalId: "DID002",
    name: "Emma Johnson",
    phoneNumber: "+44-20-7946-0958",
    aadhaarNo: "XXXX-XXXX-5678",
    travelItinerary: {
      startDate: "2024-01-12",
      endDate: "2024-01-18",
      destinations: ["Mumbai"],
      purpose: "Business Meeting",
      accommodations: [
        {
          name: "The Taj Mahal Palace",
          location: "Apollo Bunder, Mumbai",
          checkIn: "2024-01-12",
          checkOut: "2024-01-18",
        },
      ],
    },
  },
  {
    digitalId: "DID003",
    name: "Michael Brown",
    phoneNumber: "+1-416-555-0199",
    aadhaarNo: "XXXX-XXXX-9012",
    travelItinerary: {
      startDate: "2024-01-14",
      endDate: "2024-01-17",
      destinations: ["Bangalore"],
      purpose: "Tech Conference",
      accommodations: [
        {
          name: "ITC Gardenia",
          location: "Residency Road, Bangalore",
          checkIn: "2024-01-14",
          checkOut: "2024-01-17",
        },
      ],
    },
  },
  {
    digitalId: "DID004",
    name: "Sarah Davis",
    phoneNumber: "+61-2-9876-5432",
    aadhaarNo: "XXXX-XXXX-3456",
    travelItinerary: {
      startDate: "2024-01-13",
      endDate: "2024-01-22",
      destinations: ["Kolkata", "Varanasi", "Bodh Gaya"],
      purpose: "Cultural Heritage Tour",
      accommodations: [
        {
          name: "The Oberoi Grand",
          location: "Jawaharlal Nehru Road, Kolkata",
          checkIn: "2024-01-13",
          checkOut: "2024-01-16",
        },
        {
          name: "Taj Ganges",
          location: "Nadesar Palace Grounds, Varanasi",
          checkIn: "2024-01-16",
          checkOut: "2024-01-19",
        },
        {
          name: "The Imperial",
          location: "Bodh Gaya",
          checkIn: "2024-01-19",
          checkOut: "2024-01-22",
        },
      ],
    },
  },
]

// Mock movement data
export const movementData: MovementData[] = [
  // John Smith (DID001) movement data
  {
    id: "M001",
    digitalId: "DID001",
    timestamp: "2024-01-10T08:00:00Z",
    location: {
      lat: 28.5562,
      lng: 77.1,
      address: "Indira Gandhi International Airport",
      city: "New Delhi",
      state: "Delhi",
    },
    activity: "Arrived in India",
    transportMode: "flight",
  },
  {
    id: "M002",
    digitalId: "DID001",
    timestamp: "2024-01-10T10:30:00Z",
    location: {
      lat: 28.6304,
      lng: 77.2177,
      address: "Hotel Imperial, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
    },
    activity: "Checked into hotel",
    transportMode: "taxi",
  },
  {
    id: "M003",
    digitalId: "DID001",
    timestamp: "2024-01-11T09:15:00Z",
    location: {
      lat: 28.6562,
      lng: 77.241,
      address: "Red Fort",
      city: "New Delhi",
      state: "Delhi",
    },
    activity: "Sightseeing",
    transportMode: "metro",
  },
  {
    id: "M004",
    digitalId: "DID001",
    timestamp: "2024-01-13T07:00:00Z",
    location: {
      lat: 27.1767,
      lng: 78.0081,
      address: "Taj Mahal",
      city: "Agra",
      state: "Uttar Pradesh",
    },
    activity: "Tourist attraction visit",
    transportMode: "train",
  },
  {
    id: "M005",
    digitalId: "DID001",
    timestamp: "2024-01-15T10:30:00Z",
    location: {
      lat: 28.6139,
      lng: 77.209,
      address: "Current Location - India Gate",
      city: "New Delhi",
      state: "Delhi",
    },
    activity: "Current location",
    transportMode: "walking",
  },
  // Emma Johnson (DID002) movement data
  {
    id: "M006",
    digitalId: "DID002",
    timestamp: "2024-01-12T06:30:00Z",
    location: {
      lat: 19.0896,
      lng: 72.8656,
      address: "Chhatrapati Shivaji International Airport",
      city: "Mumbai",
      state: "Maharashtra",
    },
    activity: "Arrived in Mumbai",
    transportMode: "flight",
  },
  {
    id: "M007",
    digitalId: "DID002",
    timestamp: "2024-01-12T08:45:00Z",
    location: {
      lat: 18.922,
      lng: 72.8347,
      address: "The Taj Mahal Palace Hotel",
      city: "Mumbai",
      state: "Maharashtra",
    },
    activity: "Checked into hotel",
    transportMode: "taxi",
  },
  {
    id: "M008",
    digitalId: "DID002",
    timestamp: "2024-01-15T09:45:00Z",
    location: {
      lat: 19.076,
      lng: 72.8777,
      address: "Current Location - Business District",
      city: "Mumbai",
      state: "Maharashtra",
    },
    activity: "Current location - Business meeting",
    transportMode: "taxi",
  },
]

// Helper functions for enquiry system
export const getTouristDetailsByDigitalId = (digitalId: string): TouristDetails | undefined => {
  return touristDetails.find((tourist) => tourist.digitalId === digitalId)
}

export const getMovementDataByDigitalId = (digitalId: string): MovementData[] => {
  return movementData
    .filter((movement) => movement.digitalId === digitalId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export const getAllDigitalIds = (): string[] => {
  return touristDetails.map((tourist) => tourist.digitalId)
}
