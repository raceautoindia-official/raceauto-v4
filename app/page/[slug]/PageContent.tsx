import React from "react";
import parse from "html-react-parser";
import Event from "../event/event";
import AboutUs from "../about-us/aboutus";
import Contact_v2 from "../contact/contact-v2";
import Event_2 from "../event/Event-2";

const PageContent = async ({ slug }: { slug: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/pages/${slug}`
  );
  const data = await res.json();

  if (slug == "contact") {
    return <Contact_v2 />;
  }

  if (slug == "event") {
    return <Event_2 />;
  }

  if (slug == "about-us") {
    return <AboutUs />;
  }

  return(
  <>
    <div className="container mb-4">
      <h3 className="my-3">{data[0].title.toUpperCase()}</h3>
      {parse(String(data[0].page_content))}
    </div>
    <div className="mb-3"></div>
  </>)
};

export default PageContent;
