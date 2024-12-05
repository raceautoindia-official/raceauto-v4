export const dynamic = "force-dynamic";

import React from "react";
import PageContent from "./PageContent";
import Navbar from "@/components/Navbar/Navbar";
import BreakingNews from "@/components/BreakingNews/BreakingNews";


const page = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  
  return (
    <>
    <BreakingNews />
    <Navbar/>
      <div className="mt-3">
        <PageContent slug={params.slug} />
      </div>
    </>
  );
};

export default page;
