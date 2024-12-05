import React from "react";
import SlickSlider from "./SlickSlider";
import './Breakingnews.css'

const BreakingNews = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}api/breaking-news`);

  const breakingNewsData = await res.json();

  return (
    <div className="breaking-news__container">
      <span className="News__label text-center">Breaking News</span>
      <div className="breaking-news__content"><SlickSlider data={breakingNewsData}/></div>
    </div>
  );
};

export default BreakingNews;
