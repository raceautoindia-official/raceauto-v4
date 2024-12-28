import React from "react";
import { eventType } from "./eventCard";
import EventCard_2 from "./eventCard-2";
import EventSlider from "./EventSlider";
import ReactPlayer_Server from "./ReactPlayer";
import Link from "next/link";

const Event_2 = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/event`, {
    cache: "no-cache",
  });
  const data: eventType[] = await res.json();
  return (
    <>
      <EventSlider />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3>EVENTS</h3>
            <p className="my-3">
              Drive Your Passion with Exclusive Insights from RACE Auto India!!
            </p>
            <p>
              Subscribe to RACE Auto India today and stay ahead of the curve
              with our exclusive updates, in-depth reviews, and expert analyses
              on the latest in the automotive world.
            </p>
            <Link href="/subscription">
              <button className="btn btn-danger">Subscribe Now</button>
            </Link>
          </div>
          <div className="col-md-auto">
            <ReactPlayer_Server />
          </div>
        </div>
        <div className="row justify-content-center">
          {data.map((item) => (
            <EventCard_2 key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Event_2;
