import React from "react";
import RecommendedPost from "./RecommendedPost";
import LatestNews from "./LatestNews";
import ReactPlayer_Server from "./ReactPlayer";
import "./sidebar.css";
import Image from "next/image";

export type LatestNewsType = {
  id: number;
  title: string;
  title_slug: string;
};

export type RecommendedType = {
  id: number;
  title: string;
  title_slug: string;
  image_small: string;
  created_at: any;
};

const Sidebar = async () => {
  const latestnewsResponse = await fetch(
    `${process.env.BACKEND_URL}api/latest-news`
  );
  const latestNewsData: LatestNewsType[] = await latestnewsResponse.json();

  const recommendedResponse = await fetch(
    `${process.env.BACKEND_URL}api/recommended-news`
  );

  const recommendedNewsData: RecommendedType[] =
    await recommendedResponse.json();

  const sidebarTopres = await fetch(
    `${process.env.BACKEND_URL}api/admin/adspace/sidebar_top`
  );

  const sidebarTopData = await sidebarTopres.json();

  const sidebarbottomres = await fetch(
    `${process.env.BACKEND_URL}api/admin/adspace/sidebar_bottom`
  );

  const sidebarbottomData = await sidebarbottomres.json();

  const eventSettingsRes = await fetch(
    `${process.env.BACKEND_URL}api/admin/event/settings`
  );
  const eventSettingsData = await eventSettingsRes.json();

  return (
    <div className="col-lg-4 mb-4">
      <div
        className="my-4"
        style={{ position: "relative", aspectRatio: "1/1", width: "100%" }}
      >
        <Image
          unoptimized
          src={`${process.env.BACKEND_URL}${sidebarTopData[0].ad_code_300}`}
          alt="sidebar top"
          fill
        />
      </div>
      <ReactPlayer_Server />
      <div className="row mt-3">
        <div className="col-12">
          <div>
            <h6
              style={{
                backgroundColor: "#00e0ae",
                padding: 5,
                color: "white",
                fontWeight: 600,
                fontStyle: "normal",
              }}
            >
              LATEST NEWS
            </h6>
            <div
              className="side-scrollbar side-scrollbar-primary"
              style={{ maxHeight: 300 }}
            >
              {latestNewsData.map((item) => (
                <LatestNews item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-12">
          <h6
            style={{
              backgroundColor: "#00e0ae",
              padding: 5,
              color: "white",
              fontWeight: 600,
              fontStyle: "normal",
            }}
          >
            LATEST NEWS
          </h6>
          {recommendedNewsData
            .map((item) => <RecommendedPost key={item.id} item={item} />)
            .slice(0, 5)}
        </div>
      </div>
      {/* {eventSettingsData[0].event_1_visible == 1 && (
        <div
          className="my-4"
          style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}
        >
          <Image
            unoptimized
            src={`${process.env.BACKEND_URL}${eventSettingsData[0].upcoming_event_1}`}
            alt="sidebar top"
            fill
          />
        </div>
      )}
      {eventSettingsData[0].event_2_visible == 1 && (
        <div
          className="my-4"
          style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}
        >
          <Image
            unoptimized
            src={`${process.env.BACKEND_URL}${eventSettingsData[0].upcoming_event_2}`}
            alt="sidebar top"
            fill
          />
        </div>
      )} */}

      <div
        className="my-4"
        style={{ position: "relative", aspectRatio: "1/1", width: "100%" }}
      >
        <Image
          unoptimized
          src={`${process.env.BACKEND_URL}${sidebarbottomData[0].ad_code_300}`}
          alt="sidebar top"
          fill
        />
      </div>
    </div>
  );
};

export default Sidebar;
