import React from "react";
import Slider from "./Slider";
import FeatureCard from "./FeatureCard";
import styles from "./HomeBanner.module.css";

type Feature = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  created_at: any;
};

const HomeBanner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/features`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data: Feature[] = await res.json();
  const FeatureCardData1 = data
    .map((item) => <FeatureCard item={item} key={item.id} />)
    .slice(0, 2);
  const FeatureCardData2 = data
    .map((item) => <FeatureCard item={item} key={item.id} />)
    .slice(2, 4);

  return (
    <>
      <div className={`${styles.pc_homebanner} row mb-4 mt-4`}>
        <div className="col-lg-3">
          <div className="row">{FeatureCardData1}</div>
        </div>
        <div className="col-lg-6 p-0">
          <Slider />
        </div>
        <div className="col-lg-3">
          <div className="row">{FeatureCardData2}</div>
        </div>
      </div>
      <div className={`${styles.mobile_homebanner} row mb-4`}>
        <div className="col-12 p-0">
          <Slider />
        </div>
        <div className="col-12">
          <div className="row">{FeatureCardData1}</div>
        </div>

        <div className="col-12-3">
          <div className="row">{FeatureCardData2}</div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
