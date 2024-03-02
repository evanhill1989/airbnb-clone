"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "@/app/lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(locationValue)?.latLang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded relative z-0"
      center={latLang ?? [52.505, 13.4]}
      zoom={9}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [52.505, 13.4]} icon={ICON} />
    </MapContainer>
  );
}
