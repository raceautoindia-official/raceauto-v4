import React from "react";
import SubCategory from "./SubCategory";
import Sidebar from "@/components/Sidebar/Sidebar";

const SubCategoryPage = (context: {
  params: { "sub-category": string };
  searchParams: { page: string };
}) => {
  const categoryName = context.params["sub-category"];
  const page = context.searchParams.page;
  return (
    <>
      <div className="container mt-3">
        <div className="row my-3">
        <h3 className="">{categoryName.split("-").join(" ").toUpperCase()}</h3>
          <div className="col-12 d-flex justify-content-center">
            <div className="row justify-content-center">
              <div className="col-lg-8 mt-4">
                <SubCategory categoryName={categoryName} page={page} />
              </div>
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
