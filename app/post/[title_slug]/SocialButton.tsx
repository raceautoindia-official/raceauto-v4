"use client";
import React from "react";
import styles from "./page.module.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

const SocialButton = ({ title_slug }: { title_slug: string }) => {
  return (
    <>
      <div className={`${styles.logo_buttons_container} mt-2`}>
        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_BACKEND_URL}post/${title_slug}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_BACKEND_URL}post/${title_slug}`}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={`${process.env.NEXT_PUBLIC_BACKEND_URL}post/${title_slug}`}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_BACKEND_URL}post/${title_slug}`}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </>
  );
};

export default SocialButton;
