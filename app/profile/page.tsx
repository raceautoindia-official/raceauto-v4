import React from "react";
import ProfileDashboard from "./ProfileComponent";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const token: any = cookieStore.get("authToken");
  return <ProfileDashboard token={token.value} />;
};

export default page;
