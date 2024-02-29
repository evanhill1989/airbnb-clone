import Image from "next/image";

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
  console.log(imagePath);
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-72">
        <Image
          src={`https://ckthhpmgcnugotxhowns.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of the home"
          fill
          className="object-cover rounded-lg h-full mb-3"
        />
      </div>
    </div>
  );
}
