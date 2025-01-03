import Image from "next/image";
import Link from "next/link";
import styles from "../HomeBanner.module.css";
import getBaseUrl from "@/lib/getbaseurl";
import { formatDate } from "@/components/Time";

type Feature = {
  id: number;
  title: string;
  title_slug: string;
  image_big: string;
  created_at: any;
};

type Proptype = {
  item: Feature;
  key: number;
};

const FeatureCard_2 = async (props: Proptype) => {
  const { item } = props;

  const blurdata = await getBaseUrl(
    process.env.NEXT_PUBLIC_S3_BUCKET_URL + item.image_big
  );

  return (
    <Link className="link-style" href={`/post/${item.title_slug}`}>
      <div className="card" style={{ borderRadius: 0, height: "100%" }}>
        <div
          className={`${styles.banner__hover_v3}`}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/2",
            overflow: "hidden",
            borderRadius: "0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Image
            src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + `${item.image_big}`}
            alt={item.title}
            className={styles.featured__image}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurdata}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 40vw, 25vw"
            style={{ objectFit: "cover" }} // Ensure the image covers the card
          />
        </div>
        <div
          className="card-body"
          style={{
            backgroundImage:
              "linear-gradient(to bottom,rgba(120, 117, 117, 0.97),rgba(90, 81, 81, 0.97))",
              
          }}
        >
          <h6 className="card-title mt-2 text-white" >{item.title}</h6>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard_2;
