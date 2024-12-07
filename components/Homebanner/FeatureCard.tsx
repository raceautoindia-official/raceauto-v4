/* eslint-disable react/prop-types */

import Image from "next/image";
import Link from "next/link";
import styles from "./HomeBanner.module.css";
import getBaseUrl from "@/lib/getbaseurl";
type Feature = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  created_at: any;
};

type proptype = {
  item: Feature;
  key: number;
};
const FeatureCard = async (props: proptype) => {
  const { item } = props;

  const blurdata = await getBaseUrl(process.env.NEXT_PUBLIC_S3_BUCKET_URL + item.image_big);
  return (
    <div className="col-lg-12 col-6 p-1">
      <Link className="link-style" href={`/post/${item.title_slug}`}>
        <div
          className={`${styles.banner__hover_v3}`}
          style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + `${item.image_big}`}
            alt={item.title}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurdata}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 40vw, 25vw"
          />
          <div className={styles.home__overlay_text_v3}>
            <h5>{item.title}</h5>
            <p>Date Posted: {new Date(item.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeatureCard;
