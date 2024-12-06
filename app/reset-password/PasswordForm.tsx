"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setemail] = useState("");
  // State to hold the verify_link

  const passreset = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/login/forgot-password`,
        { email }
      );

      toast.info("Please check your mail inbox to verify", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      toast.error("Please try again after some times", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 m-auto">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-3"
                  name="email"
                  value={email}
                  placeholder="Enter Registered Email"
                  onChange={(e) => setemail(e.target.value)}
                  id="email"
                />
                <div className="text-center">
                  <button className="btn btn-primary" onClick={passreset}>
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
