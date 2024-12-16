/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { magazineCardType } from "./Magazine";
import MagazineCard_v2 from "./MagazineCard-v2";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./page.module.css";

const Magazine_v2 = () => {
  const [data, setData] = useState<magazineCardType[]>([]);
  const [sortedData, setSortedData] = useState<magazineCardType[]>([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCatgeory] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isloading, setIsloading] = useState<boolean>(true);

  const magazineData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/magazine`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const magazineCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/magazine/category`
      );
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const magazineSorted = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/magazine/sorted/${selectedCategory}`
      );
      setSortedData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const endOffset = itemOffset + 4;
  const currentItems = sortedData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedData.length / 4);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 4) % sortedData.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    magazineData();
    magazineCategory();
  }, []);

  useEffect(() => {
    magazineSorted();
  }, [selectedCategory]);
  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mb-4"
      >
        <SwiperSlide>
          <div
            style={{
              aspectRatio: "2.88/1",
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/Property 1=Frame 35 (2).jpg"
              alt="magazine banner"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              aspectRatio: "2.88/1",
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/Property 1=Frame 36 (1).jpg"
              alt="magazine banner"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              aspectRatio: "2.88/1",
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/Property 1=Frame 37 (2).jpg"
              alt="magazine banner"
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              aspectRatio: "2.88/1",
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/Property 1=Frame 38 (1).jpg"
              alt="magazine banner"
              fill
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="container mb-5">
        <div className="row mb-4">
          <h2 className="mt-4">Latest Edition</h2>
          {data
            .map((item) => <MagazineCard_v2 key={item.id} item={item} />)
            .slice(0, 4)}
          {isloading && (
            <>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff"
                  highlightColor="#c7d2fe"
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="container my-3">
        <div
          className="row justify-content-center text-white "
          style={{
            backgroundImage: "url('/images/category banner.jpg')",
            backgroundSize: "cover",
            height: 250,
          }}
        >
          <h1 className="m-0 mt-3 text-center">CATEGORIES</h1>
          <div className="col-md-3 col-lg-2 text-center">
            <button
              className={`btn ${styles.button_category} ${
                  selectedCategory === 0 ? "btn-warning" : "btn-light"
                }`}
              onClick={() => setSelectedCatgeory(0)}
            >
              All Magazines
            </button>
          </div>

          {category.map((item: any) => (
            <div className="col-md-3 col-lg-2 text-center" key={item.id}>
              <button
                className={`btn ${styles.button_category} ${
                  selectedCategory === item.id ? "btn-warning" : "btn-light"
                }`}
                onClick={() => setSelectedCatgeory(item.id)}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <div className="row my-5">
          {isloading && (
            <>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                  className="mb-4"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
              <div className="col-3">
                <Skeleton
                  height={200}
                  count={1}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe" // Slightly darker blue highlight
                  className="my-4"
                />
                <Skeleton
                  count={2}
                  baseColor="#e0e7ff" // Light blue background
                  highlightColor="#c7d2fe"
                />
              </div>
            </>
          )}
          {currentItems.map((item) => (
            <MagazineCard_v2 item={item} key={item.id} />
          ))}
          <div className="d-flex justify-content-center my-3">
            <ReactPaginate
              previousLabel={<GrFormPrevious />}
              nextLabel={<GrFormNext />}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Magazine_v2;
