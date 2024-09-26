import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Crear un objeto URL a partir de la URL de la solicitud
    const url = new URL(req.url);

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Latitud y longitud son requeridas", { status: 400 });
    }

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(forecastUrl, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error Getting UV Data: ", error);
    return new Response("Error getting UV Data", { status: 500 });
  }
}
