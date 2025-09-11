import type { Alert } from "./mockData";

export const getAlertColor = (type: Alert["type"]): string => {
  switch (type) {
    case "Warning":
      return "#FFA500"; // Orange
    case "Advisory":
      return "#3B82F6"; // Blue
    case "Emergency":
      return "#EF4444"; // Red
    default:
      return "#6B7280"; // Gray
  }
};

export const getAlertPriority = (type: Alert["type"]): number => {
  switch (type) {
    case "Emergency":
      return 1;
    case "Warning":
      return 2;
    case "Advisory":
      return 3;
    default:
      return 4;
  }
};

export const formatAlertTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

export const validateAlertData = (data: Partial<Alert>): string[] => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Alert title is required");
  }

  if (!data.type) {
    errors.push("Alert type is required");
  }

  if (!data.message?.trim()) {
    errors.push("Alert message is required");
  }

  if (typeof data.latitude !== "number" || isNaN(data.latitude)) {
    errors.push("Valid latitude is required");
  }

  if (typeof data.longitude !== "number" || isNaN(data.longitude)) {
    errors.push("Valid longitude is required");
  }

  return errors;
};
