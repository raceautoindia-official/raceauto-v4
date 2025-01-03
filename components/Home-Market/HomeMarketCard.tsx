import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import './home-market.css'

const HomeMarketCard = async ({ category }: { category: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/market/market-home/${category}`
  );
  const data = await res.json();
  const listData = data.slice(1);

  return (
    <div className="col-md-6 col-lg-3 mt-3">
      <Link href={`/market/${category}`}>
        {" "}
        <h6 style={{ fontWeight: 400 }} className="mb-3 market-heading">
          {category.split("-").join(" ").toUpperCase()}{" "}
          <span className="ms-1 pb-2">
            <FaAngleRight />
          </span>
        </h6>
      </Link>
      <div
        className="mb-3 image-container"
      >
        <Link href={`/post/${data[0].title_slug}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${data[0].image_big}`}
            alt={data[0].title}
            fill
            className="varient-image"
          />
        </Link>
      </div>
      {listData.map((item: any) => (
        <Link href={`/post/${item.title_slug}`} key={item.id}>
          <p className="pt-1 market-title" style={{ borderTop: "1px solid black" }}>
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default HomeMarketCard;
