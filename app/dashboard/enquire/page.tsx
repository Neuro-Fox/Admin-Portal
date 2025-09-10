"use client"

import { useState } from "react"
import { Search, User, Phone, CreditCard, MapPin, Calendar, Building, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getContract } from "@/components/ether"

// Contract data types
interface ContractLocation {
  longitude: string;
  latitude: string;
  Location_name: string;
}

interface ContractTravelDetail {
  day: bigint;
  locations: ContractLocation[];
}

interface ContractUserDetails {
  name: string;
  homeAddress: string;
  email: string;
  phoneNumber: string;
  aadhar: string;
  passport: string;
  isRegistered: boolean;
  itinerary: ContractTravelDetail[];
  registrationTime: bigint;
}

export default function EnquirePage() {
  const [digitalId, setDigitalId] = useState("")
  const [touristData, setTouristData] = useState<ContractUserDetails | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!digitalId.trim()) return

    setIsSearching(true)
    setNotFound(false)
    setError("")

    try {
      // Get contract instance
      const contract = getContract()
      
      // Check if input is a valid Ethereum address
      let userAddress = digitalId.trim()
      
      // If not a valid address format, show error
      if (!/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
        setError("Please enter a valid Ethereum address (0x...)")
        setIsSearching(false)
        return
      }

      // Call getUserDetails from contract
      // Note: This requires the caller to be either the user or an admin
      const userDetails = await contract.getUserDetails(userAddress)
      
      // Check if user is registered
      if (!userDetails.isRegistered) {
        setNotFound(true)
        setTouristData(null)
      } else {
        setTouristData(userDetails)
        setNotFound(false)
      }

    } catch (err: any) {
      console.error("Error fetching user details:", err)
      
      // Handle specific contract errors
      if (err.message && err.message.includes("Access denied")) {
        setError("Access denied. You must be an admin to view user details.")
      } else if (err.message && err.message.includes("reverted")) {
        setError("Contract call failed. Please ensure you have proper permissions.")
      } else {
        setError("Error fetching user details from contract. Please try again.")
      }
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tourist Enquiry</h2>
        <p className="text-muted-foreground">Search for detailed tourist information using Ethereum address</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="size-5" />
            Search Tourist
          </CardTitle>
          <CardDescription>
            Enter the Ethereum address to retrieve complete tourist details from the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter Ethereum address (0x...)"
                value={digitalId}
                onChange={(e) => setDigitalId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter a valid Ethereum address starting with 0x
              </p>
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Not Found Message */}
      {notFound && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <Search className="size-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold">Tourist Not Found</h3>
              <p className="text-sm">No registered tourist found with address: {digitalId}</p>
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
                    <p className="font-medium">{touristData.aadhar}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Passport</p>
                    <p className="font-medium">{touristData.passport || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{touristData.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Home Address</p>
                    <p className="font-medium">{touristData.homeAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Time</p>
                    <p className="font-medium">
                      {new Date(Number(touristData.registrationTime) * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Status</p>
                    <Badge variant={touristData.isRegistered ? "default" : "destructive"}>
                      {touristData.isRegistered ? "Registered" : "Not Registered"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Travel Days Planned</p>
                    <p className="font-medium">{touristData.itinerary.length} days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Travel Itinerary */}
      {touristData && touristData.itinerary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Travel Itinerary
            </CardTitle>
            <CardDescription>Planned locations for each day of travel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {touristData.itinerary.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Day {Number(dayPlan.day)}</h4>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {dayPlan.locations.map((location, locIndex) => (
                      <div key={locIndex} className="bg-muted/50 rounded p-3">
                        <h5 className="font-medium text-sm">{location.Location_name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lat: {location.latitude}, Long: {location.longitude}
                        </p>
                      </div>
                    ))}
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
