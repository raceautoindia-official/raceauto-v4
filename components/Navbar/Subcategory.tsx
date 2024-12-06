import React from "react";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";

type proptype = {
  id: number;
  main: string;
};

type Category = {
  id: number;
  name: string;
  name_slug: string;
  show_on_menu: number;
  category_order: number;
};

const Subcategory = async (props: proptype) => {
  const { id, main } = props;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/category/sub-category/parent/${id}`
  );
  const data = await res.json();

  return (
    <div
      className={`${styles.dropdown_menu_custom} dropdown-menu`}
      aria-labelledby="navbarDropdown"
    >
      <Link
        className={`${styles.dropdown_item} dropdown-item`}
        href={`/category/${main}`}
      >
        All
      </Link>
      {data.map((item: Category) => (
        <Link
          key={item.id}
          className={`${styles.dropdown_item} dropdown-item`}
          href={`/category/${main}/${item.name_slug}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Subcategory;
