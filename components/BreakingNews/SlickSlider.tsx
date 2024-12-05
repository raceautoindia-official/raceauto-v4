'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

const SlickSlider = ({data}:{
    data:{
        id:number;
        title:string;
        title_slug:string;
    }[]
}) => {
    const settings = {
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
      };
      const breakingNewsData = data.map((item) => (
        <div key={item.id}>
          <Link className="link-style" href={`/post/${item.title_slug}`}>
            <p className="p-0 m-0">{item.title.slice(0,40)}...</p>
          </Link>
        </div>
      ));

  return (
    <Slider {...settings}>{breakingNewsData}</Slider>
  )
}

export default SlickSlider