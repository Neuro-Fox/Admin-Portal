import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(req: NextRequest) {
  console.log("[Tourist API] Received GET request");

  try {
    console.log("[Tourist API] Fetching from stream endpoint...");
    const streamResponse = await fetch("http://12.10.11.253:8000/stream", {
      headers: {
        Accept: "text/event-stream",
      },
    });

    console.log("[Tourist API] Stream response status:", streamResponse.status);

    const headers = new Headers({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    console.log("[Tourist API] Returning stream response");
    return new NextResponse(streamResponse.body, {
      headers,
    });
  } catch (error) {
    console.error("[Tourist API] Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
