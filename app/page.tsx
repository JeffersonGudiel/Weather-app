"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic"; // Importar dynamic
import AirPollution from "./Components/AirPollution/AirPollution";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Pressure from "./Components/Pressure/Pressure";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import UvIndex from "./Components/UvIndex/UvIndex";
import Visibility from "./Components/Visibility/Visibility";
import Wind from "./Components/Wind/Wind";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import { useGlobalContextUpdate } from "./context/globalContext";

// Cargar el componente Mapbox solo en el cliente
const Mapbox = dynamic(() => import("./Components/Mapbox/Mapbox"), {
  ssr: false,
});

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [initialCityCoords, setInitialCityCoords] = useState<number[] | null>(
    null
  );

  useEffect(() => {
    const fetchInitialCoords = async () => {
      const response = await fetch("/api/getInitialCoords"); // Cambia esta URL según tu API
      const data = await response.json();
      setInitialCityCoords(data.coords);
    };

    fetchInitialCoords();
  }, []);

  useEffect(() => {
    if (initialCityCoords) {
      setActiveCityCoords(initialCityCoords);
    }
  }, [initialCityCoords, setActiveCityCoords]);

  const getClickedCityCords = (lat: number, lon: number) => {
    // Especifica los tipos aquí
    setActiveCityCoords([lat, lon]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox /> {/* Mapa cargado dinámicamente */}
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                    onClick={() => getClickedCityCords(state.lat, state.lon)}>
                    <p className="px-6 py-4">{state.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Copyright &copy; Jefferson. Todos los derechos reservados.
          <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
          <a
            href="https://www.linkedin.com/in/jefferson-alexander/"
            target="_blank"
            className="text-green-300 font-bold">
            Jefferson Gudiel.
          </a>
        </p>
      </footer>
    </main>
  );
}
