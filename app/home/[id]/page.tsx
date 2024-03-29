/* eslint-disable @next/next/no-img-element */
import prisma from "@/app/lib/db";
import Image from "next/image";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { divIcon } from "leaflet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateReservation } from "@/app/actions";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      guests: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      price: true,
      title: true,
      categoryName: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[75%] mt-10 mx-auto mb-12">
      <h1 className="text-2xl font-medium mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Home image"
          src={`https://ckthhpmgcnugotxhowns.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="object-cover rounded-lg h-full w-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} guests</p> * <p>{data?.bedrooms} bedrooms</p> *{" "}
            {data?.bathrooms} bathrooms
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col ml-4 ">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-muted-foreground text-sm">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={CreateReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <Button type="submit" className="w-full">
              Make a Reservation
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link href={"/api/auth/login"}>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
