import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";

async function getData(userId: string) {
  const data = await prisma?.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          photo: true,
          price: true,
          description: true,
          country: true,
          Favorite: true,
        },
      },
    },
  });
  return data;
}

export default async function FavoriteRoute() {
  const {} = getKindeServerSession;
  const data = await getData();
  return (
    <div>
      <h1>Favorites</h1>
    </div>
  );
}
