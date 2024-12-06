import React from "react";
import Varient1 from "./Varients/Varient 1/V1";
import Varient3 from "./Varients/Varient 3/V3";
import Varient2 from "./Varients/Varient 2/V2";
import Varient5 from "./Varients/Varient 5/Varient5";
import Varient4 from "./Varients/Varient 4/Varient4";
import { catgeorypropType } from "@/types/category";

type varient = {
  id: number;
  title: string;
  title_slug: string;
  image_mid: string;
  created_at: any;
};

const HomeCategories = async ({ item }: catgeorypropType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/category/home-category?main=${item.name_slug}`
  );

  const data: varient[] = await res.json();

  const v3Single = data.slice(0, 1);

  const threeData = data.slice(0, 3);

  const v2data = data.slice(0, 6);

  const v3data = data.slice(3, 10);

  return (
    <>
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <h6 className="">
          <span
            className="home-component-heading"
            style={{
              borderLeft: `4px solid black`,
              fontWeight: "900",
              fontStyle: "normal",
              padding: 5,
              paddingLeft: 10,
            }}
          >
            {item.name.toUpperCase()}
          </span>
        </h6>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row mt-3">
            {item.block_type == "block-1" &&
              threeData.map((item) => <Varient1 key={item.id} item={item} />)}
            {item.block_type == "block-2" && <Varient2 item={v2data} />}
            {item.block_type == "block-3" && (
              <Varient3 item={v3data} Three={threeData} />
            )}
            {item.block_type == "block-4" &&
              data
                .map((item) => <Varient4 key={item.id} item={item} />)
                .slice(0, 2)}
            {item.block_type == "block-5" && (
              <Varient5 item={v3data} single={v3Single} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategories;
