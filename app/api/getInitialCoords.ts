
import { NextResponse } from "next/server";

export async function GET() {
  const coords = { lat: 0, lon: 0 }; // Define tus coordenadas iniciales aquí
  return NextResponse.json({ coords });
}
