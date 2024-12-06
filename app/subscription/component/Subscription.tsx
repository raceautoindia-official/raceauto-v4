import { SubscriptionType } from "@/types/subscription";
import React from "react";
import dynamic from "next/dynamic";

const SubscriptionCard = dynamic(() => import("./subscriptionCard"));

const Subscription = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/subscription`,
    { cache: "no-cache" }
  );
  const data: SubscriptionType[] = await res.json();
  return (
    <>
      <SubscriptionCard data={data} />
    </>
  );
};

export default Subscription;
