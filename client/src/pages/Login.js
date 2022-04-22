import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login_applicant } from "../controllers/applicant";
import { login_recruiter } from "../controllers/recruiter";

export default function Login() {
  document.title = "Login | Easy-Jobs";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login_handleChange = async (e) => {
    e.preventDefault();
    let login_userType = document.getElementById("login_userType").value;
    if (login_userType === "applicant") {
      let obj = {
        applicant_email: email,
        applicant_password: password,
      };
      login_applicant(obj).then((data) => {
        if (data.tag === true) {
          localStorage.setItem("applicant_token", data.token);
        }
        alert(data.message);
        window.location.reload();
      });
    } else if (login_userType === "recruiter") {
      let obj = {
        recruiter_email: email,
        recruiter_password: password,
      };
      login_recruiter(obj).then((data) => {
        if (data.tag === true) {
          localStorage.setItem("recruiter_token", data.token);
        }
        alert(data.message);
        window.location.reload();
      });
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="upperbar bg-indigo-600">
          <div className="nav float-right p-[3rem] text-2xl font-encode text-white">
            <Navbar />
          </div>
          <Link to="/">
            <h1 className="text-6xl text-white  shadow-2xl font-medium p-8 font-titan">
              {" "}
              Easy Jobs
            </h1>
          </Link>
        </div>

        <div className="signup-formrelative w-1/4 shadow-xl p-5 md:rounded-md mx-auto min-w-fitrounded-xl mt-10 bg-[#ffffff]">
          <h1 className="ml-10 mb-5 text-[3rem] font-semibold text-indigo-600">
            {" "}
            Login
            <br />
            <span className="text-xl">Welcome Back !</span>
          </h1>

          <label className="text-xl ml-10 font-medium mt-5">
            {" "}
            Email address
          </label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="role shadow-2xl p-3 w-[85%] text-xl ml-10 bg-white  outline-none border-2 rounded-xl"
          />

          <div className="location mt-5">
            <label className="text-xl ml-10 font-medium"> Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="location p-3 border-2 shadow-2xl w-[85%] text-xl  ml-10  bg-white outline-none rounded-xl"
            />
          </div>
          <div className="jobtype mt-5">
            <label className="jobtype ml-10 text-xl font-medium ">
              User Type
            </label>
            <br />
            <select
              id="login_userType"
              className="job-type shadow-2xl p-3 w-[85%] text-xl ml-10 mb-5 border-2 bg-white outline-none rounded-xl"
            >
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button
            className="submit p-3 border-2 shadow-2xl w-[85%] text-xl hover:bg-[#c0c0c0] ml-10 mb-5 bg-white outline-none rounded-xl "
            type="submit"
            onClick={login_handleChange}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
