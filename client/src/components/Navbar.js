import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({ active }) {
  const navigate = useNavigate();

  let className_jobs = "m-3 p-2 rounded";
  let className_post_a_job = "m-3 p-2 rounded";
  let className_signup = "m-3 p-2 rounded";
  let className_dashboard = "m-3 p-2 rounded";

  if (active === "jobs") {
    className_jobs += " text-blue-300";
  } else if (active === "post_a_job") {
    className_post_a_job += " text-blue-300";
  } else if (active === "signup") {
    className_signup += " text-blue-300";
  } else if (active === "dashboard") {
    className_dashboard += " text-blue-300";
  }

  return (
    <>
      <div className="nav">
        <Link className="m-3" to="/"></Link>
        <Link className={className_jobs} to="/jobs">
          Jobs
        </Link>
        <Link className={className_post_a_job} to="/postjob">
          Post a Job
        </Link>
        {localStorage.getItem("applicant_token") ||
        localStorage.getItem("recruiter_token") ? (
          localStorage.getItem("applicant_token") ? (
            <>
              <Link className={className_dashboard} to="/applicant/dashboard">
                Dashboard
              </Link>
              <button
                className={className_signup}
                onClick={() => {
                  localStorage.removeItem("applicant_token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={className_dashboard} to="/recruiter/dashboard">
                Dashboard
              </Link>
              <button
                className={className_signup}
                onClick={() => {
                  localStorage.removeItem("recruiter_token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )
        ) : (
          <Link className={className_signup} to="/signup">
            Signup
          </Link>
        )}
      </div>
    </>
  );
}
