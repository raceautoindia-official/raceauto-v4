"use client";
import { SubscriptionType } from "@/types/subscription";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import InfoBox from "./informationBox";
import SubscriptionForm from "./SubscriptionForm";

const montserrat = Montserrat({ subsets: ["latin"] });

const SubscriptionCard = ({ data }: { data: SubscriptionType[] }) => {
  const [isYear, setIsYear] = useState(true);

  function formatNumber(num: number) {
    if (num >= 10000000) {
      // If number is in crores
      return (num / 10000000).toFixed(1) + "Cr";
    } else if (num >= 100000) {
      // If number is in lakhs
      return (num / 100000).toFixed(1) + "L";
    } else if (num >= 1000) {
      // If number is in thousands
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  }

  const platinumPlan = data.filter((item) => item.platinum == 1);
  const goldPlan = data.filter((item) => item.gold == 1);
  const silverPlan = data.filter((item) => item.silver == 1);
  const bronzePlan = data.filter((item) => item.bronze == 1);

  const MonthlyPrice = data.filter((item) => item.plan == "Monthly price");
  const AnnualPrice = data.filter((item) => item.plan == "Annual price");

  return (
    <>
      <div className={`row justify-content-center`}>
        <div className="col-md-8 text-center">
          <h2 className="mt-3 font-weight-medium mb-1 text-primary">
            Grow better with right plan
          </h2>
          <h6 className="subtitle">We offer 100% satisfaction</h6>
          <div className="switcher-box mt-4 d-flex align-items-center justify-content-center"></div>
          <div className="btn-group">
            <button
              type="button"
              className={`${!isYear ? "btn-primary" : "btn-secondary"} btn `}
              onClick={() => setIsYear(false)}
            >
              Month
            </button>
            <button
              type="button"
              className={`${isYear ? "btn-primary" : "btn-secondary"} btn `}
              onClick={() => setIsYear(true)}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-3 col-md-6">
          <div className="card text-center card-shadow on-hover border-0 mb-4">
            <div className="card-body font-14">
              <h5 className="mt-3 mb-1 font-weight-medium">BRONZE</h5>
              <h6 className="subtitle font-weight-normal">
                For Small Businesses & Startups
              </h6>
              <div className="pricing my-3">
                <sup>₹</sup>
                <span className={!isYear ? "display-5" : "d-none"}>
                  {MonthlyPrice[0].bronze}
                </span>
                <span className={isYear ? "display-5" : "d-none"}>
                  {/* {AnnualPrice[0].bronze} */}
                  {formatNumber(AnnualPrice[0].bronze)}
                </span>
                <small className={!isYear ? "monthly" : "d-none"}>/mo</small>
                <small className={isYear ? "" : "d-none"}>/yr</small>
                <span className={isYear ? "d-block" : "d-none"}>
                  Save{" "}
                  <span className="font-weight-medium text-warning">
                    ₹
                    {formatNumber(
                      MonthlyPrice[0].bronze * 12 - AnnualPrice[0].bronze
                    )}
                  </span>{" "}
                  a Year
                </span>
              </div>
              <ul className="text-start pl-2">
                {bronzePlan.map((item, i) => (
                  <li key={i} className="py-1">
                    {item.plan}
                  </li>
                ))}
                <li className="d-block py-1">&nbsp;</li>
              </ul>
              <div className="bottom-btn">
                <a
                  className="btn btn-primary-gradiant btn-md text-white btn-block"
                  href="mailto:kh@raceinnovations.in?subject=Inquiry%20About%20Subscription%20details&body=Hi%20there,"
                >
                  <span>Buy It</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card text-center card-shadow on-hover border-0 mb-4">
            <div className="card-body font-14">
              <h5 className="mt-3 mb-1 font-weight-medium">SILVER</h5>
              <h6 className="subtitle font-weight-normal">
                For Growing Businesses
              </h6>
              <div className="pricing my-3">
                <sup>₹</sup>
                <span className={!isYear ? "display-5" : "d-none"}>
                  {MonthlyPrice[0].silver}
                </span>
                <span className={isYear ? "display-5" : "d-none"}>
                  {formatNumber(AnnualPrice[0].silver)}
                </span>
                <small className={!isYear ? "monthly" : "d-none"}>/mo</small>
                <small className={isYear ? "" : "d-none"}>/yr</small>
                <span className={isYear ? "d-block" : "d-none"}>
                  Save{" "}
                  <span className="font-weight-medium text-warning">
                    ₹
                    {formatNumber(
                      MonthlyPrice[0].silver * 12 - AnnualPrice[0].silver
                    )}
                  </span>{" "}
                  a Year
                </span>
              </div>
              <ul className="text-start pl-2">
                {silverPlan.map((item, i) => (
                  <li key={i} className="py-1">
                    {item.plan}
                  </li>
                ))}
                <li className="d-block py-1">&nbsp;</li>
              </ul>
              <div className="bottom-btn">
                <a
                  className="btn btn-danger-gradiant btn-md text-white btn-block"
                  href="mailto:kh@raceinnovations.in?subject=Inquiry%20About%20Subscription%20details&body=Hi%20there,"
                >
                  <span>Buy It</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card text-center card-shadow on-hover border-0 mb-4">
            <div className="card-body font-14">
              <h5 className="mt-3 mb-1 font-weight-medium">GOLD</h5>
              <h6 className="subtitle font-weight-normal">
                For Expanding Enterprises
              </h6>
              <div className="pricing my-3">
                <sup>₹</sup>
                <span className={!isYear ? "display-5" : "d-none"}>
                  {MonthlyPrice[0].gold}
                </span>
                <span className={isYear ? "display-5" : "d-none"}>
                  {formatNumber(AnnualPrice[0].gold)}
                </span>
                <small className={!isYear ? "monthly" : "d-none"}>/mo</small>
                <small className={isYear ? "" : "d-none"}>/yr</small>
                <span className={isYear ? "d-block" : "d-none"}>
                  Save{" "}
                  <span className="font-weight-medium text-warning">
                    ₹
                    {formatNumber(
                      MonthlyPrice[0].gold * 12 - AnnualPrice[0].gold
                    )}
                  </span>{" "}
                  a Year
                </span>
              </div>
              <ul className="text-start pl-2">
                {goldPlan.map((item, i) => (
                  <li key={i} className="py-1">
                    {item.plan}
                  </li>
                ))}
                <li className="d-block py-1">&nbsp;</li>
              </ul>
              <div className="bottom-btn">
                <a
                  className="btn btn-warning-gradiant btn-md text-white btn-block"
                  href="mailto:kh@raceinnovations.in?subject=Inquiry%20About%20Subscription%20details&body=Hi%20there,"
                >
                  <span>Buy It</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card text-center card-shadow on-hover mb-4 border border-success">
            <div className="card-body font-14">
              <span
                className="badge badge-inverse p-2 position-absolute price-badge font-weight-normal bg-success"
                style={{ color: "white" }}
              >
                Popular
              </span>
              <h5 className="mt-3 mb-1 font-weight-medium">PLATINUM</h5>
              <h6 className="subtitle font-weight-normal">
                For Large Corporations
              </h6>
              <div className="pricing my-3">
                <sup>₹</sup>
                <span className={!isYear ? "display-5" : "d-none"}>
                  {MonthlyPrice[0].platinum}
                </span>
                <span className={isYear ? "display-5" : "d-none"}>
                  {formatNumber(AnnualPrice[0].platinum)}
                </span>
                <small className={!isYear ? "monthly" : "d-none"}>/mo</small>
                <small className={isYear ? "" : "d-none"}>/yr</small>
                <span className={isYear ? "d-block" : "d-none"}>
                  Save{" "}
                  <span className="font-weight-medium text-warning">
                    ₹
                    {formatNumber(
                      MonthlyPrice[0].platinum * 12 - AnnualPrice[0].platinum
                    )}
                  </span>{" "}
                  a Year
                </span>
              </div>
              <ul className="text-start pl-2">
                {platinumPlan.map((item, i) => (
                  <li key={i} className="py-1">
                    {item.plan}
                  </li>
                ))}
                <li className="d-block py-1">&nbsp;</li>
              </ul>
              <div className="bottom-btn">
                <a
                  className="btn btn-success-gradiant btn-md text-white btn-block"
                  href="mailto:kh@raceinnovations.in?subject=Inquiry%20About%20Subscription%20details&body=Hi%20there,"
                >
                  <span>Buy It</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row justify-content-center">
          <div className="col-12">
            <InfoBox />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SubscriptionCard;
