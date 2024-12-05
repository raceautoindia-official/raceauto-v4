import React from "react";
import { SearchData } from "./SearchPage";
import Image from "next/image";
import Link from "next/link";
import getBaseUrl from "@/lib/getbaseurl";
import { formatDate } from "@/components/Time";

const SearchCard = async ({ item }: { item: SearchData }) => {


  const blurdata = await getBaseUrl(
    `${process.env.BACKEND_URL}${item.image_mid}`,
  );
  return (
    <div className="col-12 mt-3" key={item.id}>
      <Link className="link-style" href={`/post/${item.title_slug}`}>
        <div className="row">
          <div className="col-md-4">
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                position: "relative",
              }}
            >
              <Image
                src={`${process.env.BACKEND_URL}${item.image_mid}`}
                fill
                alt={item.title}
                priority
                placeholder={item.image_mid ? "blur" : undefined}
                blurDataURL={item.image_mid ? blurdata : undefined}
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
              />
            </div>
          </div>
          <div className="col-md-8">
            <h4>{item.title}</h4>
            <p>{formatDate(item.created_at)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchCard;
