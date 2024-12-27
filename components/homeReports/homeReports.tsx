import Image from "next/image";
import React from "react";

const HomeReports = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/reports`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="row my-4">
        
      <div className="col-md-4">
      <h3 className="mb-3">REPORT</h3>
        <h5 className="mb-3">{data[0].title}</h5>
        <p>{data[0].summary}</p>
      </div>
      <div className="col-md-8">
        <div
          style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${data[0].image_url}`}
            alt={data[0].title}
            style={{objectFit:'cover'}}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default HomeReports;
