import axios from "axios";
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

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(pollutionUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollution data: ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
