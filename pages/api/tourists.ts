import type { NextApiRequest, NextApiResponse } from "next"
import { tourists } from "@/lib/mockData"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulate real-time data with slight variations
    const dynamicTourists = tourists.map((tourist) => ({
      ...tourist,
      lastPing: new Date().toISOString(),
      // Randomly adjust safety scores slightly for live effect
      safetyScore: Math.max(0, Math.min(100, tourist.safetyScore + (Math.random() - 0.5) * 5)),
    }))

    res.status(200).json(dynamicTourists)
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
