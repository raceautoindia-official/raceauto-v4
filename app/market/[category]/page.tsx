import React from "react";
import MainCategory from "./Market";
import Sidebar from "@/components/Sidebar/Sidebar";

const MarketPage = (context: {
  params: { "category": string };
  searchParams: { page: string };
}) => {
  const categoryName = context.params["category"];
  const page = context.searchParams.page;
  return (
    <>
      <div className="container mt-3">
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-center">
            <div className="row justify-content-center">
              <div className="col-lg-8 mt-4">
                <MainCategory categoryName={categoryName} page={page} />
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;
