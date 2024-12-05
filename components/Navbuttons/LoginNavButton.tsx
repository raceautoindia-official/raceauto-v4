import React from "react";
import { cookies } from "next/headers";
import ProfileButton from "./ProfileButton";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
const LoginNavButton = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token || token == undefined) {
    return <Link href="/login"><CiLogin size={25} className="me-3"/></Link>;
  } 

  return(<ProfileButton token={token.value} />)
 
  
};

export default LoginNavButton;
