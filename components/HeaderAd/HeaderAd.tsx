"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./HeaderAd.css";

const HeaderAd = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Match the CSS transition duration
  };

  const headerData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/admin/adspace/header`
      );
      setData(res.data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    headerData();
  }, []);

  // Auto-hide the ad after 20 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 20000); // 20 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton
            height={50}
            count={1}
            baseColor="#e0e7ff"
            highlightColor="#c7d2fe"
            className="my-4"
          />
        </div>
      ) : (
        isVisible && (
          <div
            className={`header-ad my-4 ${isHiding ? "header-ad-hide" : ""}`}
            style={{
              position: "relative",
              aspectRatio: "8/1",
              width: "100%",
              objectFit: "contain",
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${data.ad_code_728}`}
              alt="index top"
              fill
            />
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )
      )}
    </>
  );
};

export default HeaderAd;
