import React from "react";
import FeatureCard from "../FeatureCard";
import Slider_2 from "./Slider-2";
import FeatureCard_2 from "./FeaturedCard-2";

type Feature = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  created_at: any;
  featured_order: number;
};

const HomeBanner_2 = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/features`,
    {
      cache: "no-store",
    }
  );
  const data: Feature[] = await res.json();
  const orderedFeatures = data.sort(
    (a, b) => a.featured_order - b.featured_order
  );
  const FeatureCardData1 = orderedFeatures
    .map((item) => <FeatureCard_2 item={item} key={item.id} />)
    .slice(0, 1);
  const FeatureCardData2 = orderedFeatures
    .map((item) => (
      <div className="col-md-6 col-lg-3" key={item.id}>
        <FeatureCard_2 item={item} key={item.id} />
      </div>
    ))
    .slice(1, 5);

  return (
    <>
      <div className={`row mb-4 mt-3`}>
        <div className="col-lg-9">
          <Slider_2 />
        </div>
        <div className="col-lg-3">{FeatureCardData1}</div>
      </div>
      <div className="row mt-3">{FeatureCardData2}</div>
    </>
  );
};

export default HomeBanner_2;
