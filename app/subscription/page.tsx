export const dynamic = "force-dynamic";
import React from "react";
import SubscriptionPage from "./component/SubscriptionPage";

import BreakingNews from "@/components/BreakingNews/BreakingNews";
import Navbar from "@/components/Navbar/Navbar";

const page = () => {
  return(
  <>
    <BreakingNews />
    <Navbar />
    <SubscriptionPage />
  </>
  )
};

export default page;
