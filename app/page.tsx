import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { ListingCard } from "./components/ListingCard";

async function getData() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  });

  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <div>
        {data.map((item) => {
          return (
            <ListingCard
              key={item.id}
              desription={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              location={item.country as string}
            />
          );
        })}
      </div>
    </div>
  );
}
