/* eslint-disable react/no-unescaped-entities */
'use client'
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import CountUp from 'react-countup';

const TextArea = () => {
  return (
    <>
    <div className="text-center mt-4">
      <h3 className="my-2">
        We’ve reached <CountUp end={500000} duration={7} className="text-danger"/> lakh subscribers and counting!"
      </h3>
      <SubscriptionForm/>
    </div>
    </>
  );
};

export default TextArea;
