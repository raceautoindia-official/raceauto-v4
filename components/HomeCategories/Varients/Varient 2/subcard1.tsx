import Link from "next/link";
import "../Varient.css";
import Image from "next/image";
import { varientproptype } from "@/types/varient";
import { formatDate } from "@/components/Time";

const SubcardV2_1 = ({ item }: varientproptype) => {

  return (
    <>
      <div className="mb-3 col-md-6">
        <div className="border-0 card card-no-bg">
          <Link className="link-style" href={`/post/${item.title_slug}`}>
            <div className="image-container">
              <Image
                src={`${process.env.BACKEND_URL}${item.image_mid}`}
                className="varient-image"
                alt={
                  item.title.length > 40
                    ? `${item.title.slice(0, 40)}...`
                    : item.title
                }
                fill
                priority
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1200px) 40vw, 25vw"
              />
            </div>
            <div className="card-body">
              <h6 className="mt-3 card-heading">
                {item.title.length > 80
                  ? `${item.title.slice(0, 90)}...`
                  : item.title}
              </h6>
              <p className="card-text small">{formatDate(item.created_at)}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubcardV2_1;
