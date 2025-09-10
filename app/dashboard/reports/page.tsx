import { ReportsTable } from "@/components/ReportsTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Phone, TrendingUp } from "lucide-react"
import { alerts, sosReports, getDashboardStats } from "@/lib/mockData"

export default function ReportsPage() {
  const stats = getDashboardStats()
  const totalReports = alerts.length + sosReports.length
  const pendingSOS = sosReports.filter((report) => report.status === "pending").length
  const resolvedSOS = sosReports.filter((report) => report.status === "resolved").length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="size-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-foreground">Reports & Incidents</h1>
      </div>

      {/* Reports Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
            <div className="p-2 rounded-lg bg-blue-50">
              <FileText className="size-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalReports}</div>
            <p className="text-xs text-muted-foreground">All incidents tracked</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <div className="p-2 rounded-lg bg-orange-50">
              <AlertTriangle className="size-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending SOS</CardTitle>
            <div className="p-2 rounded-lg bg-red-50">
              <Phone className="size-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingSOS}</div>
            <p className="text-xs text-muted-foreground">Emergency calls</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolution Rate</CardTitle>
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="size-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {sosReports.length > 0 ? Math.round((resolvedSOS / sosReports.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Cases resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <ReportsTable />
    </div>
  )
}
