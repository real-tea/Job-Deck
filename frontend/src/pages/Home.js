import React from 'react'
import Navbar from "../Components/Navbar"
import {Link} from "react-router-dom"; 


export default function Home() {
    document.title = "Job-Deck";
    return (
      <>
        <div className="home-page no-scrollbar">
          <div className="upperbar bg-emerald-600">
            <div className="nav float-right p-[3rem] text-2xl font-encode text-white">
              <Navbar />
            </div>
            <Link to="/">
              <h1 className="text-6xl text-white  shadow-2xl font-medium p-8 font-titan">
                {" "}
                Job Deck
              </h1>
            </Link>
          </div>
  
          <div className="hero p-20 flex mb-48 flex-row">
            <div className="title p-5 ml-10 b">
              <h1 className="text-emerald-600 text-4xl p-5 font-encode">
                Easily find a job with <br />
                <span className="text-9xl"> Job Deck..</span>{" "}
              </h1>
              <div className="mt-5">
                <Link
                  to="/login"
                  className="submit p-3 border-2 shadow-2xl text-xl hover:bg-[#c0c0c0] hover:text-indigo-800 font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="submit p-3 border-2 shadow-2xl text-xl hover:bg-[#c0c0c0] hover:text-indigo-800 font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
                >
                  Signup
                </Link>
              </div>
  
            </div>
  
            <div className="image absolute right-0 ">
              <img className="fadeupdown mr-20 rounded-2xl shadow-2xl"  />
              {/* src={main} */}
            </div>
          </div>
  
          <div className="home-other p-10 flex flex-row bg-indigo-600">
            <div className="text">
              <h1 className="applicant text-[3.5rem] text-white font-semibold p-16 m-5">
                {" "}
                Are you an Applicant?{" "}
              </h1>
              <p className="applicant text-[1.5rem] ml-20 mr-[30%] text-justify font-medium text-white">
                {" "}
                Find jobs easily with Easy-Jobs.
                Filter jobs based on the job type and mode.
                We aspire to provide you the best possible jobs with optimum work and payscale.
              </p>
              <div className="mt-10 ml-[3.3rem]">
                <Link
                  to="/jobs"
                  className="submit p-3 border-2 shadow-2xl text-xl text-indigo-600 hover:bg-[#c0c0c0] hover:text-indigo-800 font-medium ml-6 mb-5 bg-white outline-none rounded-xl "
                >
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="appimg">
              <img className="float-right p-10 m-5 max-w-2xl" />  
              {/* src={applicant}   */}
            </div>
          </div>
  
          <div className="home-other p-10 flex flex-row bg-white">
  
            <div className="appimg">
              <img className="float-left p-10 mr-48 max-w-2xl"  />
              {/* src={recruiter} */}
            </div>
  
            <div className="text float-right">
              <h1 className="recru text-[3.5rem] text-indigo-600 font-semibold p-16 m-5">
                {" "}
                Are you a Recruiter?{" "}
              </h1>
              <p className="recru text-[1.5rem] ml-20 mr-[15%] text-justify font-medium text-indigo-600 ">
                {" "}
                Having a hard time finding people who can fix that bug, manage that team or quench your busness requirements in whatever needed , here are three simple stpes which can help you.
                Signup as Recruiter on Easy-Jobs , Post a Job and boom with in sometime your dashboard will be populated with candidate applications.
              </p>
              <div className="mt-10 ml-[3.3rem]">
                <Link
                  to="/postjob"
                  className="submit p-3 border-2 shadow-2xl text-xl hover:bg-indigo-500 font-medium ml-6 mb-5 bg-indigo-600 text-white outline-none rounded-xl "
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