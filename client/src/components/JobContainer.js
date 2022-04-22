import React, { useState } from "react";
import { apply_application } from "../controllers/applicant";
// jobpost_recruiter_id

// jobpost_type (part-time/full-time /internship) - done
// jobpost_mode (work form home / in-office) - done
// jobpost_location - done
// jobpost_company_name - done
// jobpost_duration -done
// jobpost_role (ex: backend dev , business developer) -done
// jobpost_pay (salary kitna loge) - done
// jobpost_job_description -
// jobpost_experience (entry level , mid-senior level , etc )

export default function JobContainer(props) {
  const [isOpen, setIsOpen] = useState(false);

  function job_application() {
    let obj = {
      application_applicant_id: JSON.parse(
        atob(localStorage.getItem("applicant_token").split(".")[1])
      ).id,
      application_jobpost_id: props.id,
    };

    apply_application(obj).then((data) => {
      alert(data.message);
      window.location.reload();
    });
  }

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex drop-shadow-2xl backdrop-blur-[2px]">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-medium">{props.company_name}</div>
                <button onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-xl mb-2">({props.role})</div>

              <div className="flex items-center justify-start mb-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span>
                  {props.location}-{props.mode}
                </span>
              </div>
              <hr className="divide-y divide-solid w-[100%]" />
              <div className="text-md mb-2">
                <div className="text-lg mb-1">Job description</div>
                {props.job_description}
                <br />
                Experience : {props.experience}
              </div>
              <hr className="divide-y divide-solid w-[100%]" />

              <div className="flex items-center justify-start mb-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  {props.duration} - {props.type}
                </div>
              </div>

              <div className="flex items-center justify-start mb-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>Salary : {props.pay}</div>
              </div>

              <hr className="divide-y divide-solid w-[100%]" />

              <button
                className="check m-3 bg-indigo-600 rounded-xl text-white font-medium p-3"
                onClick={job_application}
              >
                Apply Now
              </button>
            </div>
          </div>
        </>
      )}
      <div className="job-container flex flex-row m-10 shadow-2xl">
        <div className="role w-[50%] p-3 text-2xl font-medium ">
          {props.role}
          <div className="company text-lg p-1 bg-indigo-600 text-white rounded w-[35%] text-center">
            {props.company_name}
          </div>
        </div>
        <div className="job-type m-3 w-[50%] text-xl font-medium p-3">
          {props.type} - {props.mode} - {props.location}
        </div>
        <button
          className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3"
          onClick={() => setIsOpen(true)}
        >
          Check
        </button>
      </div>
    </>
  );
}
