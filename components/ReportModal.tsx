"use client"

import { User, MapPin, Phone, Shield, FileText, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// Removed mock data dependencies for on-chain only view

type ReportItem = {
  id: string
  type: "alert" | "sos"
  touristId: string
  touristName: string
  alertMessage?: string
  timestamp: string
  status: string
  location?: [number, number]
  phoneNumber?: string
  aadhar?: string
  passport?: string
  homeAddress?: string
}

interface ReportModalProps {
  report: ReportItem | null
  isOpen: boolean
  onClose: () => void
}

export function ReportModal({ report, isOpen, onClose }: ReportModalProps) {
  if (!report) return null

  const tourist = null
  const blockchainUser = null

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
                  <span className="text-sm">{report.alertMessage}</span>
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

          {/* On-chain Tourist Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="size-5 text-blue-600" />
              Tourist Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">User Address</label>
                  <p className="text-sm font-mono mt-1">{report.touristId}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm font-medium mt-1">{report.touristName}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{report.phoneNumber || '-'}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Home Address</label>
                  <p className="text-sm mt-1">{report.homeAddress || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* On-chain identity fields */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="size-5 text-blue-600" />
              Identity Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">Aadhar:</span>
                <span className="ml-2 font-mono">{report.aadhar || '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Passport:</span>
                <span className="ml-2 font-mono">{report.passport || '-'}</span>
              </div>
            </div>
          </div>

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
