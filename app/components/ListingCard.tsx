import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";

import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { AddToFavorite, DeleteFromFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  imagePath,
  description,
  location,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-72">
        <Image
          src={`https://ckthhpmgcnugotxhowns.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of the home"
          fill
          className="object-cover rounded-lg h-full"
        />

        {userId && (
          <div className="absolute top-2 right-2 z-10">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={AddToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/listing/${imagePath}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="text-muted-foreground pt-2">
          {" "}
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
