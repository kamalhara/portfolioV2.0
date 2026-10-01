import { loadStateglyphDownloads } from "@/app/lib/stateglyphDownloads";

export async function GET() {
  try {
    const stats = await loadStateglyphDownloads();
    return Response.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Download statistics are temporarily unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
