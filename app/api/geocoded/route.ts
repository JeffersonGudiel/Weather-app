import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Obtener la URL completa de la solicitud
    const url = new URL(req.url);
    const city = url.searchParams.get("search");

    // Validar que el parámetro city esté presente
    if (!city) {
      return new Response("El parámetro de búsqueda es requerido", {
        status: 400,
      });
    }

    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    // Realizar la solicitud a la API de geocodificación
    const res = await axios.get(geocodeUrl);

    // Verificar si la respuesta es correcta
    if (res.status !== 200) {
      return new Response("Error fetching geocoded data", {
        status: res.status,
      });
    }

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data: ", error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
