import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Crear un objeto URL a partir de la URL de la solicitud
    const url = new URL(req.url);

    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    // Validar que los parámetros lat y lon estén presentes
    if (!lat || !lon) {
      return new Response("Missing latitude or longitude", { status: 400 });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(weatherUrl);

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
