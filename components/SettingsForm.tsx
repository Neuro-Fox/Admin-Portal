"use client"

import { useState } from "react"
import { Map, Bell, Globe, Save, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface SettingsState {
  mapEnabled: boolean
  alertTypes: {
    restrictedArea: boolean
    locationMissing: boolean
    stationaryAlert: boolean
    pathDeviation: boolean
  }
  notifications: {
    emailAlerts: boolean
    smsAlerts: boolean
    pushNotifications: boolean
    soundAlerts: boolean
  }
  language: string
  theme: string
  refreshInterval: string
  mapZoom: string
}

const defaultSettings: SettingsState = {
  mapEnabled: true,
  alertTypes: {
    restrictedArea: true,
    locationMissing: true,
    stationaryAlert: true,
    pathDeviation: true,
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    soundAlerts: true,
  },
  language: "en",
  theme: "system",
  refreshInterval: "30",
  mapZoom: "5",
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateNestedSetting = (category: keyof SettingsState, key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving settings:", settings)
    setHasChanges(false)
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
      {/* Map Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="size-5 text-blue-600" />
            Map Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="map-enabled">Enable Map View</Label>
              <p className="text-sm text-muted-foreground">Show the interactive tourist location map</p>
            </div>
            <Switch
              id="map-enabled"
              checked={settings.mapEnabled}
              onCheckedChange={(checked) => updateSetting("mapEnabled", checked)}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="map-zoom">Default Map Zoom</Label>
              <Select value={settings.mapZoom} onValueChange={(value) => updateSetting("mapZoom", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zoom level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Country View (3)</SelectItem>
                  <SelectItem value="5">Regional View (5)</SelectItem>
                  <SelectItem value="7">State View (7)</SelectItem>
                  <SelectItem value="10">City View (10)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
              <Select
                value={settings.refreshInterval}
                onValueChange={(value) => updateSetting("refreshInterval", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Type Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-orange-600" />
            Alert Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="restricted-area"
                checked={settings.alertTypes.restrictedArea}
                onCheckedChange={(checked) => updateNestedSetting("alertTypes", "restrictedArea", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="restricted-area"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Restricted Area Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Alert when tourists enter restricted zones</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="location-missing"
                checked={settings.alertTypes.locationMissing}
                onCheckedChange={(checked) => updateNestedSetting("alertTypes", "locationMissing", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="location-missing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Location Missing Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Alert when tourist location cannot be determined</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="stationary-alert"
                checked={settings.alertTypes.stationaryAlert}
                onCheckedChange={(checked) => updateNestedSetting("alertTypes", "stationaryAlert", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="stationary-alert"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stationary Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Alert when tourists remain stationary for over 24 hours</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="path-deviation"
                checked={settings.alertTypes.pathDeviation}
                onCheckedChange={(checked) => updateNestedSetting("alertTypes", "pathDeviation", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="path-deviation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Path Deviation Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Alert when tourists deviate from planned routes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-green-600" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch
                id="email-alerts"
                checked={settings.notifications.emailAlerts}
                onCheckedChange={(checked) => updateNestedSetting("notifications", "emailAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-alerts">SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
              </div>
              <Switch
                id="sms-alerts"
                checked={settings.notifications.smsAlerts}
                onCheckedChange={(checked) => updateNestedSetting("notifications", "smsAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => updateNestedSetting("notifications", "pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Audio notifications for alerts</p>
              </div>
              <Switch
                id="sound-alerts"
                checked={settings.notifications.soundAlerts}
                onCheckedChange={(checked) => updateNestedSetting("notifications", "soundAlerts", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5 text-purple-600" />
            Language & Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Interface Language</Label>
              <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme Preference</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Unsaved Changes
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="size-4" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="flex items-center gap-2">
            <Save className="size-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
