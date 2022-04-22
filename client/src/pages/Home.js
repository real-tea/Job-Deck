import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import main from "../assets/main.png";
import applicant from '../assets/applicant.png'
import recruiter from '../assets/recru.png'
import '../styles/index.css'


export default function Home() {
  document.title = "JobBuzz";
  return (
    <>
      <div className="home-page no-scrollbar">
        <div className="upperbar bg-[#085F63]">
          <div className="nav float-right p-[3rem] text-2xl font-encode text-white">
            <Navbar />
          </div>
          <Link to="/">
            <h1 className="text-6xl text-white  shadow-2xl font-medium p-9 font-titan">
              {" "}
              JobBuzz
            </h1>
          </Link>
        </div>

        <div className="hero p-20 flex mb-48 flex-row">
          <div className="title p-5 ml-10 b">
            <h1 className="text-[#49BEB7] text-4xl p-4 font-description">
              Find opportunities on 🚀
              <br />
              <br />
              <span className="text-9xl p-8 font-titan nav float-left"> JobBuzz</span>{" "}
            </h1>
            <div className="mt-5">
              <Link
                to="/login"
                className="submit p-3 border-4 shadow-2xl text-xl hover:bg-[#FACF5A] hover:text-[#49BEB7] font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
              >
                Login ⚡
              </Link>
              <Link
                to="/signup"
                className="submit p-3 border-4 shadow-2xl text-xl hover:bg-[#FACF5A] hover:text-[#49BEB7] font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
              >
                Signup 🥇
              </Link>
            </div>

          </div>

          <div className="image absolute right-0 ">
            {/* <img className="fadeupdown w-4/5 mr-20 rounded-3xl shadow-2xl" src={main} /> */}
          </div>
        </div>

        <div className="home-other p-10 flex flex-row bg-[#FF6F86]">
          <div className="text">
            <h1 className="applicant text-[3.5rem] text-white font-semibold p-16 m-5 font-titan">
              {" "}
              Looking for a Job?{" "}
            </h1>
            <p className="applicant text-[1.5rem] ml-20 mr-[30%] text-justify font-medium text-white font-description">
              {" "}
              Land your dream jobs on JobBuzz.
              Filter jobs upon you convenience ,
              job searching now made easy ✨
            </p>
            <div className="mt-10 ml-[3.3rem]">
              <Link
                to="/jobs"
                className="font-description submit p-3 border-2 shadow-2xl text-xl text-[#49BEB7] hover:bg-[#FACF5A] hover:text-indigo-800 font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
              >
                Apply Now
              </Link>
            </div>
          </div>
          <div className="appimg">
            <img className="fadeupdown w-4/5 mr-20 rounded-3xl " src={applicant} />
          </div>
        </div>

        <div className="home-other p-10 flex flex-row bg-white">

          <div className="appimg">
            <img className="float-left p-10 mr-48 max-w-2xl" src={recruiter} />
          </div>

          <div className="text float-right">
            <h1 className="recru text-[3.5rem] text-[#49BEB7] font-semibold p-16 m-5 font-titan">
              {" "}
              Looking to Recruit?{" "}
            </h1>
            <p className="recru text-[1.5rem] ml-20 mr-[15%] text-justify font-medium text-[#49BEB7] font-description ">
              {" "}
             Looking to hire and make your own super team? Look no more
             JobBuzz brings the sharpest and keenest minds to one place. 
             Register as a recruiter now 💪
            </p>
            <div className="mt-10 ml-[3.3rem]">
              <Link
                to="/postjob"
                className="font-description submit p-3 border-2 shadow-2xl text-xl hover:bg-[#FACF5A] font-medium ml-6 mb-5 bg-white text-black outline-none rounded-xl "
              >
                Recruite Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
