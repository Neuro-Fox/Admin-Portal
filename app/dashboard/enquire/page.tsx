"use client"

import { useState } from "react"
import { Search, User, Phone, CreditCard, MapPin, Calendar, Building, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTouristDetailsByDigitalId, getMovementDataByDigitalId, getAllDigitalIds } from "@/lib/enquireData"
import type { TouristDetails, MovementData } from "@/lib/enquireData"

export default function EnquirePage() {
  const [digitalId, setDigitalId] = useState("")
  const [touristData, setTouristData] = useState<TouristDetails | null>(null)
  const [movementHistory, setMovementHistory] = useState<MovementData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (!digitalId.trim()) return

    setIsSearching(true)
    setNotFound(false)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const tourist = getTouristDetailsByDigitalId(digitalId.trim())
    const movements = getMovementDataByDigitalId(digitalId.trim())

    if (tourist) {
      setTouristData(tourist)
      setMovementHistory(movements)
      setNotFound(false)
    } else {
      setTouristData(null)
      setMovementHistory([])
      setNotFound(true)
    }

    setIsSearching(false)
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTransportIcon = (mode?: string) => {
    switch (mode) {
      case "flight":
        return "✈️"
      case "train":
        return "🚂"
      case "taxi":
        return "🚕"
      case "bus":
        return "🚌"
      case "metro":
        return "🚇"
      case "walking":
        return "🚶"
      default:
        return "📍"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tourist Enquiry</h2>
        <p className="text-muted-foreground">Search for detailed tourist information using Digital ID</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="size-5" />
            Search Tourist
          </CardTitle>
          <CardDescription>
            Enter the Digital ID to retrieve complete tourist details and movement history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter Digital ID (e.g., DID001, DID002, DID003, DID004)"
                value={digitalId}
                onChange={(e) => setDigitalId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <p className="text-xs text-muted-foreground mt-2">Available IDs: {getAllDigitalIds().join(", ")}</p>
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Not Found Message */}
      {notFound && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <Search className="size-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold">Tourist Not Found</h3>
              <p className="text-sm">No tourist found with Digital ID: {digitalId}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tourist Details */}
      {touristData && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <User className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{touristData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{touristData.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                    <p className="font-medium">{touristData.aadhaarNo}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5" />
                Travel Itinerary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Travel Period</p>
                    <p className="font-medium">
                      {touristData.travelItinerary.startDate} to {touristData.travelItinerary.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destinations</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {touristData.travelItinerary.destinations.map((dest, index) => (
                        <Badge key={index} variant="secondary">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Purpose</p>
                    <p className="font-medium">{touristData.travelItinerary.purpose}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accommodations */}
      {touristData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="size-5" />
              Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {touristData.travelItinerary.accommodations.map((accommodation, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold">{accommodation.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{accommodation.location}</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-medium">Check-in:</span> {accommodation.checkIn}
                    </p>
                    <p>
                      <span className="font-medium">Check-out:</span> {accommodation.checkOut}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Movement History */}
      {movementHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Movement History
            </CardTitle>
            <CardDescription>Complete movement tracking from arrival to current location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movementHistory.map((movement, index) => (
                <div key={movement.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      {getTransportIcon(movement.transportMode)}
                    </div>
                    {index < movementHistory.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{movement.activity}</h4>
                      <Badge variant="outline" className="text-xs">
                        {movement.transportMode || "Unknown"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {movement.location.address}, {movement.location.city}, {movement.location.state}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(movement.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
