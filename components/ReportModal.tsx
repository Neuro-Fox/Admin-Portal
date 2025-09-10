"use client"

import { User, MapPin, Phone, Shield, FileText, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getTouristById, getBlockchainUserByTouristId } from "@/lib/mockData"

type ReportItem = {
  id: string
  type: "alert" | "sos"
  touristId: string
  touristName: string
  alertType?: string
  timestamp: string
  status: string
  location?: [number, number]
}

interface ReportModalProps {
  report: ReportItem | null
  isOpen: boolean
  onClose: () => void
}

export function ReportModal({ report, isOpen, onClose }: ReportModalProps) {
  if (!report) return null

  const tourist = getTouristById(report.touristId)
  const blockchainUser = getBlockchainUserByTouristId(report.touristId)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5 text-blue-600" />
            Report Details - {report.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Summary */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Report Type</label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={report.type === "alert" ? "secondary" : "destructive"} className="capitalize">
                    {report.type}
                  </Badge>
                  <span className="text-sm">{report.alertType}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      report.status === "pending"
                        ? "destructive"
                        : report.status === "resolved"
                          ? "default"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{new Date(report.timestamp).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(report.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              {report.location && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="size-4 text-muted-foreground" />
                    <span className="text-sm font-mono">
                      {report.location[0].toFixed(4)}, {report.location[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Tourist Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="size-5 text-blue-600" />
              Tourist Information
            </h3>

            {tourist && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-sm font-medium mt-1">{tourist.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Safety Score</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{tourist.safetyScore}/100</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Status</label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          tourist.status === "normal"
                            ? "default"
                            : tourist.status === "alert"
                              ? "secondary"
                              : "destructive"
                        }
                        className="capitalize"
                      >
                        {tourist.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Ping</label>
                    <p className="text-sm mt-1">{new Date(tourist.lastPing).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Blockchain/KYC Information */}
          {blockchainUser && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="size-5 text-blue-600" />
                KYC & Travel Information
              </h3>

              <div className="space-y-4">
                {/* KYC Data */}
                <div>
                  <h4 className="font-medium mb-2">Identity Verification</h4>
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Full Name:</span>
                      <span className="ml-2 font-medium">{blockchainUser.kycData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nationality:</span>
                      <span className="ml-2 font-medium">{blockchainUser.kycData.nationality}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passport:</span>
                      <span className="ml-2 font-mono">{blockchainUser.kycData.passportNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Age:</span>
                      <span className="ml-2 font-medium">{blockchainUser.kycData.age} years</span>
                    </div>
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h4 className="font-medium mb-2">Travel Itinerary</h4>
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Destination:</span>
                      <span className="ml-2 font-medium">{blockchainUser.itinerary.destination}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purpose:</span>
                      <span className="ml-2 font-medium">{blockchainUser.itinerary.purpose}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="ml-2 font-medium">{blockchainUser.itinerary.checkIn}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-out:</span>
                      <span className="ml-2 font-medium">{blockchainUser.itinerary.checkOut}</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div>
                  <h4 className="font-medium mb-2">Emergency Contacts</h4>
                  <div className="space-y-2">
                    {blockchainUser.emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center gap-4 text-sm p-2 bg-muted rounded">
                        <Phone className="size-4 text-muted-foreground" />
                        <div className="flex-1">
                          <span className="font-medium">{contact.name}</span>
                          <span className="text-muted-foreground ml-2">({contact.relationship})</span>
                        </div>
                        <span className="font-mono">{contact.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent">
              Raise Ticket
            </Button>
            <Button variant="default" className="flex-1">
              Mark Resolved
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
