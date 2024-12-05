"use client";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

type SliderType = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  slider_order: number;
};

export default function MySwiperComponent({
  slides,
}: {
  slides: SliderType[];
}) {
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      autoplay={{ delay: 2000, pauseOnMouseEnter: true }} // Increase delay to reduce initial activity
      speed={600} // Faster slide transition
      slidesPerView={1}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 80,
        modifier: 1.5,
      }}
      modules={[Pagination, Autoplay]}
      style={{ marginTop: 3 }}
      pagination={{
        dynamicBullets: true,
        clickable:true
      }}
    >
      {slides.map((item) => (
        <SwiperSlide key={item.id}>
          <Link href={`/post/${item.title_slug}`}>
            <ImageWithPlaceholder
              src={process.env.BACKEND_URL + item.image_big}
              alt={item.title}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function ImageWithPlaceholder({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: "100%", position: "relative", aspectRatio: "3/2" }}>
      {loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <Skeleton
            height={50}
            count={1}
            baseColor="#e0e7ff" // Light blue background
            highlightColor="#c7d2fe" // Slightly darker blue highlight
            className="my-4"
          />
          {/* Replace this with any custom placeholder component, e.g., a spinner */}
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        priority
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
