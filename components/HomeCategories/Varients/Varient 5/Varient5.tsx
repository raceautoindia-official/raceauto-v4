import "../Varient.css";
import SubCardV5_2 from "./Varient5_card2";
import SubCardV5_1 from "./Varient5_card1";
import Link from "next/link";
import Image from "next/image";
import { varient } from "@/types/varient";
import { formatDate } from "@/components/Time";
type VarientProps = {
  item: varient[]; // Array of Variant objects
  single: varient[]; // Array of Variant objects
};

const Varient5 = ({ item, single }: VarientProps) => {
  const data1 = item
    .map((item) => <SubCardV5_1 key={item.id} item={item} />)
    .slice(0, 3);
  const data2 = item
    .map((item) => <SubCardV5_2 key={item.id} item={item} />)
    .slice(3, 6);
  return (
    <>
      {single.map((item) => (
        <div className="col-12" key={item.id}>
          <div className="card mb-1 mb-3 card-no-bg">
            <Link className="link-style" href={`/post/${item.title_slug}`}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="image-container">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${item.image_mid}`}
                        className="varient-image"
                        alt={item.title}
                        fill
                        priority
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 40vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="content mt-4">
                      <p className="card-heading">{item.title}</p>

                      <p className="card-text small">
                        {formatDate(item.created_at)}
                      </p>
                      {/* <p>{item.titl}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-6">{data1}</div>
          <div className="col-sm-6">{data2}</div>
        </div>
      </div>
    </>
  );
};

export default Varient5;
