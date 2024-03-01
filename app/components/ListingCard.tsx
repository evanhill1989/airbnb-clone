import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";

interface iAppProps {
  imagePath: string;
  desription: string;
  location: string;
  price: number;
}

export function ListingCard({
  imagePath,
  desription,
  location,
  price,
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
      </div>

      <Link href={`/listing/${imagePath}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {desription}
        </p>
        <p className="text-muted-foreground pt-2">
          {" "}
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}
