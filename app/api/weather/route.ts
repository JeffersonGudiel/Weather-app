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
      return new NextResponse("Latitud y longitud son requeridas", {
        status: 400,
      });
    }

    // Construir la URL para la API de OpenWeatherMap
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Realizar la solicitud a la API
    const res = await axios.get(weatherUrl);

    // Verificar que la respuesta sea correcta antes de devolver
    if (res.status !== 200) {
      return new NextResponse("Error fetching weather data", {
        status: res.status,
      });
    }

    // Devolver la respuesta en formato JSON
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching weather data:", error); // Imprimir error completo
    return new NextResponse("Error fetching weather data", { status: 500 });
  }
}
