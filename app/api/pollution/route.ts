"use server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Realizar la solicitud a la API de contaminación
    const res = await axios.get(pollutionUrl);

    // Verificar si la respuesta es correcta
    if (res.status !== 200) {
      const errorMessage = res.data.message || "Error fetching pollution data"; // Obtener el mensaje de error si existe
      return new NextResponse(errorMessage, { status: res.status });
    }

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error in getting pollution data: ", error); // Usar console.error para errores
    return new NextResponse("Error fetching pollution data", { status: 500 });
  }
}
