import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Obtener la URL completa de la solicitud
    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    // Validar que lat y lon estén presentes
    if (!lat || !lon) {
      return new NextResponse("Latitud y longitud son requeridas", {
        status: 400,
      });
    }

    const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Realizar la solicitud a la API
    const dailyRes = await fetch(dailyUrl);

    // Verificar si la respuesta es correcta
    if (!dailyRes.ok) {
      const errorData = await dailyRes.json(); // Obtener detalles del error
      console.error("Error fetching daily data:", errorData);
      return new NextResponse(
        `Error fetching daily data: ${errorData.message}`,
        { status: dailyRes.status }
      );
    }

    const dailyData = await dailyRes.json();
    return NextResponse.json(dailyData);
  } catch (error) {
    console.error("Error in getting daily data:", error);
    return new NextResponse("Error in getting daily data", { status: 500 });
  }
}
