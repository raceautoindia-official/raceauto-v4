import React from "react";
import Post, { postType } from "./post";
import Sidebar from "@/components/Sidebar/Sidebar";

export async function generateMetadata({
  params,
}: {
  params: { title_slug: string };
}) {
  const { title_slug } = params;

  // Simulating data fetch (Replace with your actual API call)
  const res = await fetch(
    `${process.env.BACKEND_URL}api/post/single-post/${title_slug}`
  );
  const data: postType[] = await res.json();

  const { title, summary, image_mid } = data[0];

  return {
    title: title,
    description: summary,
    openGraph: {
      title: title,
      description: summary,
      images: [
        {
          url: `${process.env.BACKEND_URL}${image_mid}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: `${process.env.BACKEND_URL}post/${title_slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary,
      images: [`${process.env.BACKEND_URL}${image_mid}`],
    },
    alternates: {
      canonical: `${process.env.BACKEND_URL}post/${title_slug}`,
    },
  };
}

const PostPage = ({
  params,
}: {
  params: {
    title_slug: string;
  };
}) => {
  return (
    <>
      <div className="container">
        <div className={`row`}>
          <Post title={params.title_slug} />
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default PostPage;
