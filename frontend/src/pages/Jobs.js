import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Container from "../Components/Container";
import { Link } from "react-router-dom";
import { get_all_jobposts } from "../Controllers/Recruiter";
import { applicant_auth } from "../Controllers/applicant";

export default function Jobs() {
  document.title = "Jobs | Easy-Jobs";

  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [jobs, setJobs] = useState([]);
  let [filteredJobs, setFilteredJobs] = useState([]);
  let [filter_type, setFilter_type] = useState("");
  let [filter_mode, setFilter_mode] = useState("");

  useEffect(() => {
    if (localStorage.getItem("applicant_token")) {
      let obj = {
        token: localStorage.getItem("applicant_token"),
      };
      applicant_auth(obj).then((data) => {
        if (data.tag) {
          setIsLoggedIn(true);
          get_all_jobposts().then((data) => {
            console.log(data);
            setJobs(data.message);
            setFilteredJobs(data.message);
          });
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, []);

  const jobSearch = () => {
    let obj = jobs.filter(
      (job) =>
        job.jobpost_type === filter_type && job.jobpost_mode === filter_mode
    );
    setFilteredJobs(obj);
  };

  return (
    <>
      <div className=" ">
        <div className="upperbar bg-indigo-600">
          <div className="nav float-right p-[3rem] text-2xl  font-encode text-white">
            <Navbar active="jobs" />
          </div>
          <Link to="/">
            <h1 className="text-6xl text-white  shadow-2xl font-medium p-8 font-titan">
              {" "}
              Easy Jobs
            </h1>
          </Link>
        </div>
      </div>
      {isLoggedIn ? (
        <>
          <div className="find-jobs-container bg-white shadow-2xl rounded-xl  p-16 ml-10 mr-10 mt-10">
            <h2 className="text-3xl font-semibold  m-5 text-indigo-600">
              Find Jobs
            </h2>

            <div className="flex flex-row">
              <select
                value={filter_type}
                onChange={(e) => setFilter_type(e.target.value)}
                className="p-3 w-[50%] text-xl m-5 bg-[#e0e0e0] outline-none rounded-xl "
              >
                <option value="part-time">Select Type</option>
                <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
              </select>

              <select
                value={filter_mode}
                onChange={(e) => setFilter_mode(e.target.value)}
                className="p-3 w-[50%] text-xl m-5 bg-[#e0e0e0] outline-none rounded-xl "
              >
                <option value="">Select Mode</option>
                <option value="remote">Remote</option>
                <option value="in-office">In-office</option>
              </select>

              <button
                className="p-3 w-[50%] text-white text-xl m-5 rounded-xl bg-indigo-600"
                onClick={jobSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="show-jobs-container bg-white shadow-2xl rounded-xl  p-16 ml-10 mr-10 mt-10">
            <h2 className="text-3xl font-semibold  m-5 text-indigo-600">
              {filteredJobs.length} Results Found
            </h2>
            {filteredJobs ? (
              filteredJobs.map((job) => (
                <Container
                  id={job._id}
                  type={job.jobpost_type}
                  mode={job.jobpost_mode}
                  location={job.jobpost_location}
                  company_name={job.jobpost_company_name}
                  duration={job.jobpost_duration}
                  role={job.jobpost_role}
                  pay={job.jobpost_pay}
                  job_description={job.jobpost_job_description}
                  experience={job.jobpost_experience}
                />
              ))
            ) : (
              <>No job openings</>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="apply-job-container text-left  dark:bg-[#2e2e2e] relative w-[38%] shadow-xl p-10 text-2xl md:rounded-md mx-auto min-w-fitrounded-xl mt-10  bg-[#ffffff]">
            "You are not logged in ,{" "}
            <Link
              className="font-medium text-indigo-700 underline underline-offset-1"
              to="/login"
            >
              Login
            </Link>{" "}
            as <span className="font-semibold">Applicant</span> to continue"
          </div>
        </>
      )}
    </>
  );
}