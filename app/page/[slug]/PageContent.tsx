import React from "react";
import parse from "html-react-parser";
import Contact from "../contact/contact";
import Event from "../event/event";
import AboutUs from "../about-us/aboutus";

const PageContent = async ({ slug }: { slug: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/pages/${slug}`
  );
  const data = await res.json();

  if (slug == "contact") {
    return <Contact />;
  }

  if (slug == "event") {
    return <Event />;
  }

  if (slug == "about-us") {
    return <AboutUs />;
  }

  return <div className="">{parse(String(data[0].page_content))}</div>;
};

export default PageContent;
