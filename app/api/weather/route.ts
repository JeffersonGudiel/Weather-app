import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Validar que los parámetros lat y lon estén presentes
    if (!lat || !lon) {
      return new Response("Missing latitude or longitude", { status: 400 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    // Verificar si la respuesta es correcta
    if (res.status !== 200) {
      return new Response("Error fetching weather data", {
        status: res.status,
      });
    }

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching forecast data:", error); // Imprimir error completo
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
