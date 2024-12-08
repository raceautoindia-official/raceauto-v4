"use client";

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React from "react";

const EditButton = ({ token, id }: { token: string; id: number }) => {
  const decoded: any = jwtDecode(token);
  if (
    decoded.role == "admin" ||
    decoded.role == "ad team" ||
    decoded.role == "moderator"
  ) {
    return (
      <Link href={`/admin/article/${id}`}>
        <button className="btn btn-primary mb-3">Edit</button>
      </Link>
    );
  }
  return null;
};

export default EditButton;
