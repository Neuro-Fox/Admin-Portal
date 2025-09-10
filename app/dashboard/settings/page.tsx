import { SettingsForm } from "@/components/SettingsForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Shield, Info } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="size-6 text-blue-600" />
        <h1 className="text-3xl font-bold text-foreground">Dashboard Settings</h1>
      </div>

      {/* Settings Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Info className="size-5" />
            Configuration Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-1">Map Settings</h4>
              <p>Configure map display preferences and refresh intervals for real-time tracking.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Alert Management</h4>
              <p>Enable or disable specific alert types based on your monitoring requirements.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Notifications</h4>
              <p>Choose how you want to receive alerts and emergency notifications.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Language Support</h4>
              <p>Select your preferred language for the dashboard interface.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Form */}
      <SettingsForm />

      {/* Security Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Shield className="size-5" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">
            All settings changes are logged for security purposes. Critical alert types cannot be completely disabled to
            ensure tourist safety monitoring continues. Contact your system administrator for advanced configuration
            options.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
