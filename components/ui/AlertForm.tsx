"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AlertFormProps {
  selectedLocation: { lat: number; lng: number; radius?: number } | null;
  onAlertCreated: (alert: any) => void;
}

export function AlertForm({
  selectedLocation,
  onAlertCreated,
}: AlertFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    message: "",
    latitude: "",
    longitude: "",
    radius: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update form when location is selected from map
  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: selectedLocation.lat.toFixed(6),
        longitude: selectedLocation.lng.toFixed(6),
        radius: selectedLocation.radius ? selectedLocation.radius.toString() : prev.radius,
      }));
    }
  }, [selectedLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.type ||
      !formData.message ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.radius
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const alertData = {
        title: formData.title,
        type: formData.type as "Warning" | "Advisory" | "Emergency",
        message: formData.message,
        latitude: Number.parseFloat(formData.latitude),
        longitude: Number.parseFloat(formData.longitude),
        radius: Number.parseFloat(formData.radius),
      };

      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        throw new Error("Failed to create alert");
      }

      const newAlert = await response.json();
      onAlertCreated(newAlert);

      // Reset form
      setFormData({
        title: "",
        type: "",
        message: "",
        latitude: "",
        longitude: "",
        radius: "",
      });

      toast({
        title: "Success",
        description: "Alert created and broadcasted successfully",
      });
    } catch (error) {
      console.error("Error creating alert:", error);
      toast({
        title: "Error",
        description: "Failed to create alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Alert Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter alert title"
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Alert Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alert type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Advisory">Advisory</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Enter alert message"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, latitude: e.target.value }))
            }
            placeholder="40.7128"
            required
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, longitude: e.target.value }))
            }
            placeholder="-74.0060"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="radius">Alert Radius (meters)</Label>
        <Input
          id="radius"
          type="number"
          min="100"
          step="100"
          value={formData.radius}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, radius: e.target.value }))
          }
          placeholder="1000"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending Alert..." : "Send Alert"}
      </Button>
    </form>
  );
}
