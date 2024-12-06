"use client";
import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";
import { magazineCardType } from "./Magazine";

const MagazineCard_v2 = ({ item }: { item: magazineCardType }) => {
  return (
    <div className="col-lg-3">
      <Card>
        <div
          style={{
            position: "relative",
            aspectRatio: "1/1",
            width: "100%",
          }}
        >
          <Image
            alt={item.title}
            fill
            priority
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${item.image_url}`}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 40vw, 25vw"
          />
        </div>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MagazineCard_v2;
