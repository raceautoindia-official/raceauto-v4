export const dynamic = "force-dynamic";
import React from "react";
import SubscriptionPage from "./component/SubscriptionPage";

import BreakingNews from "@/components/BreakingNews/BreakingNews";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import GreenBar from "@/components/GreenBar/MagazineBar";

const page = () => {
  return (
    <>
      <BreakingNews />
      <Navbar />
      <div className="main_content__position">
        <SubscriptionPage />
      </div>
      <Footer />
      <GreenBar />
    </>
  );
};

export default page;
