import Image from "next/image";
import React from "react";

const Authorize = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center text-center">
        <div>
          <h2>Unauthorized</h2>
          <div
            style={{
              width: "100%",
              minWidth:400,
              position: "relative",
              aspectRatio: "1.8/1",
            }}
          >
            <Image
              src="/images/auth-page.png"
              alt="auth page"
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorize;
