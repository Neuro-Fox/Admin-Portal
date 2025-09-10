"use client"

import type React from "react"

import { useState } from "react"
import { FileText, AlertTriangle, Phone, Clock, User, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { alerts, sosReports, getTouristById } from "@/lib/mockData"
import { ReportModal } from "./ReportModal"

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

export function ReportsTable() {
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Combine alerts and SOS reports into a unified format
  const reportItems: ReportItem[] = [
    ...alerts.map((alert) => {
      const tourist = getTouristById(alert.touristId)
      return {
        id: alert.id,
        type: "alert" as const,
        touristId: alert.touristId,
        touristName: tourist?.name || "Unknown Tourist",
        alertType: alert.type,
        timestamp: alert.timestamp,
        status: "active",
        location: alert.location,
      }
    }),
    ...sosReports.map((sos) => {
      const tourist = getTouristById(sos.touristId)
      return {
        id: sos.id,
        type: "sos" as const,
        touristId: sos.touristId,
        touristName: tourist?.name || "Unknown Tourist",
        alertType: "SOS Emergency",
        timestamp: sos.raisedAt,
        status: sos.status,
      }
    }),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const handleRowClick = (report: ReportItem) => {
    setSelectedReport(report)
    setIsModalOpen(true)
  }

  const handleRaiseTicket = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement ticket raising logic
    console.log("Raising ticket for report:", reportId)
  }

  const handleMarkResolved = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement mark resolved logic
    console.log("Marking resolved for report:", reportId)
  }

  const getStatusBadge = (status: string, type: "alert" | "sos") => {
    if (type === "alert") {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
          Active
        </Badge>
      )
    }

    return status === "pending" ? (
      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
        Pending
      </Badge>
    ) : (
      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
        Resolved
      </Badge>
    )
  }

  const getTypeIcon = (type: "alert" | "sos") => {
    return type === "alert" ? (
      <AlertTriangle className="size-4 text-orange-500" />
    ) : (
      <Phone className="size-4 text-red-500" />
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5 text-blue-600" />
            Reports & Incidents
          </CardTitle>
          <p className="text-sm text-muted-foreground">Click on any row to view detailed information</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Alert/SOS Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportItems.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(report)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <span className="capitalize font-medium">{report.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-muted-foreground" />
                        <span>{report.touristName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{report.alertType}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{new Date(report.timestamp).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(report.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status, report.type)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => handleRaiseTicket(report.id, e)} className="cursor-pointer">
                            Raise Ticket
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleMarkResolved(report.id, e)}
                            className="cursor-pointer"
                          >
                            Mark Resolved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ReportModal report={selectedReport} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
