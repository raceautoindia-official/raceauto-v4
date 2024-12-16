"use client";
import React from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const SlickSlider = ({
  data,
}: {
  data: {
    id: number;
    title: string;
    title_slug: string;
  }[];
}) => {
  const breakingNewsData = data.map((item) => (
    <SwiperSlide key={item.id}>
      <Link className="link-style" href={`/post/${item.title_slug}`}>
        <p className="p-0 m-0 ">{item.title.slice(0, 40)}...</p>
      </Link>
    </SwiperSlide>
  ));

  return (
    // <Slider {...settings}>{breakingNewsData}</Slider>
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={15}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      style={{ maxHeight: 25 }}
      className="mySwiper"
    >
      {breakingNewsData}
    </Swiper>
  );
};

export default SlickSlider;
