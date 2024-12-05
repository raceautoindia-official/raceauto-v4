import React from "react";
import MagazineCard from "./MagazineCard";

export type magazineCardType = {
  id: number;
  image_url: string;
  title: string;
  title_slug: string;
  keywords: string;
  created_date:any;
};

const Magazine = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}api/magazine`, {
    next: {
      revalidate: 600,
    },
  });
  const data: magazineCardType[] = await res.json();

  return (
    <>
      {data.map((item) => (
        <MagazineCard key={item.id} item={item} />
      ))}
    </>
  );
};

export default Magazine;
