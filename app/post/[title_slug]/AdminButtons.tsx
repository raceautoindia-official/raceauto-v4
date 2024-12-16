"use client";

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React from "react";

const AdminButtons = ({ token, id }: { token: string; id: number }) => {
  const decoded: any = jwtDecode(token);
  if (
    decoded.role == "admin" ||
    decoded.role == "ad team" ||
    decoded.role == "moderator"
  ) {
    return (
      <>
        <Link href={`/admin/article/${id}`}>
          <button className="btn btn-warning mb-3 me-2">Edit</button>
        </Link>
        <Link href="/admin/article/create">
          <button className="btn btn-primary mb-3 me-2">Create New</button>
        </Link>
      </>
    );
  }
  return null;
};

export default AdminButtons;
