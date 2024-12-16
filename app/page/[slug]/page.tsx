export const dynamic = "force-dynamic";

import React from "react";
import PageContent from "./PageContent";
import Navbar from "@/components/Navbar/Navbar";
import BreakingNews from "@/components/BreakingNews/BreakingNews";
import Footer from "@/components/Footer/Footer";
import GreenBar from "@/components/GreenBar/MagazineBar";


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
      <Footer/>
      <GreenBar/>
    </>
  );
};

export default page;
