"use client"

import { User, MapPin, Phone, Shield, FileText, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="size-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">Report Details</div>
              <div className="text-sm font-normal text-muted-foreground">ID: {report.id}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Report Summary */}
          <div className="bg-gray-50/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Report Summary</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Report Type
                  </label>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={report.type === "alert" ? "secondary" : "destructive"} 
                      className="capitalize text-sm px-3 py-1"
                    >
                      {report.type}
                    </Badge>
                    {report.alertMessage && (
                      <span className="text-sm text-gray-700 font-medium">
                        {report.alertMessage}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Status
                  </label>
                  <Badge
                    variant={
                      report.status === "pending"
                        ? "destructive"
                        : report.status === "resolved"
                          ? "default"
                          : "secondary"
                    }
                    className="capitalize text-sm px-3 py-1"
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Timestamp
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <Clock className="size-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(report.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>

                {report.location && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Location
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <MapPin className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-mono text-gray-900">
                        {report.location[0].toFixed(4)}, {report.location[1].toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Tourist Information */}
          <div className="bg-blue-50/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-900">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="size-5 text-blue-600" />
              </div>
              Tourist Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Wallet Address
                  </label>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm font-mono text-gray-900 break-all">
                      {report.touristId}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Full Name
                  </label>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm font-medium text-gray-900">
                      {report.touristName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Contact Number
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <Phone className="size-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {report.phoneNumber || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Home Address
                  </label>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-gray-900">
                      {report.homeAddress || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Identity Information */}
          <div className="bg-green-50/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-900">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="size-5 text-green-600" />
              </div>
              Identity Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Aadhar Number
                </label>
                <div className="p-3 bg-white rounded-lg border">
                  <span className="text-sm font-mono text-gray-900">
                    {report.aadhar || 'Not provided'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Passport Number
                </label>
                <div className="p-3 bg-white rounded-lg border">
                  <span className="text-sm font-mono text-gray-900">
                    {report.passport || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button 
              variant="outline" 
              className="flex-1 h-11 bg-white hover:bg-gray-50 border-gray-300"
            >
              <FileText className="size-4 mr-2" />
              Raise Ticket
            </Button>
            <Button 
              variant="default" 
              className="flex-1 h-11 bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="size-4 mr-2" />
              Mark Resolved
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}