import React from "react";
import styles from "./HomeBanner.module.css";
import MySwiperComponent from "./Swiperslide";

type SliderType = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  slider_order: number;
};

const Slider = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}api/slider`, {
    cache: "no-store",
  });
  const slides: SliderType[] = await response.json();

  const sortedSlider = slides.sort((a, b) => a.slider_order - b.slider_order);

  return <MySwiperComponent slides={sortedSlider} />;
};

export default Slider;
