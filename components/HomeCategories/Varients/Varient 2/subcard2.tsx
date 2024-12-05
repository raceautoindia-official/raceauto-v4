import Link from "next/link";
import Image from "next/image";
import { varientproptype } from "@/types/varient";
import "./Varient2.css";
import "../Varient.css";
import { formatDate } from "@/components/Time";
const SubcardV2_1 = ({ item }: varientproptype) => {


  return (
    <>
      <div className="col-md-6 mb-3 mx-0 p-0">
        <div className="card border-0 card-no-bg">
          <Link className="link-style" href={`/post/${item.title_slug}`}>
            <div className="card-body">
              <div className="row p-0">
                <div className="col-6 p-0">
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
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                    />
                  </div>
                </div>
                <div className="col-6 mt-2">
                  <div className="content-card2">
                    <h6 className="card-heading">
                      {item.title.length > 40
                        ? `${item.title.slice(0, 40)}...`
                        : item.title}
                    </h6>
                    <div className="card-text">
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubcardV2_1;
