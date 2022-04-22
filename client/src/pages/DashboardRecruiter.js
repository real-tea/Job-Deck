import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth_recruiter, delete_jobpost, get_jobposts, get_jobpost_applications } from "../controllers/recruiter";
import { get_all_jobposts } from "../controllers/recruiter";
import JobContainer from "../components/JobContainer";
import { get_recruiter_details_by_id } from '../controllers/recruiter';


export default function DashboardRecruiter() {
    document.title = "Recruiter-Dashboard | Easy-Jobs";

    const [isOpen, setIsOpen] = useState(false);
    let [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
    let [applicants, setApplicants] = useState([])

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [jobposts, setJobposts] = useState([])

    useEffect(() => {
        if (localStorage.getItem("recruiter_token")) {
            let obj = {
                token: localStorage.getItem("recruiter_token")
            }
            auth_recruiter(obj).then(data => {
                if (data.tag) {
                    setIsRecruiterLoggedIn(true);
                    let obj = { id: JSON.parse(atob(localStorage.getItem("recruiter_token").split(".")[1])).id }
                    get_recruiter_details_by_id(obj).then(data => {
                        setName(data.message.recruiter_name)
                        setEmail(data.message.recruiter_email)
                    });

                    get_jobposts(obj).then(data=>{
                        
                        setJobposts(data.message)});

                }
                else {
                    setIsRecruiterLoggedIn(false);
                }
            })
        }


    }, []);

    return (
        <>
            <div className="upperbar bg-indigo-600">
                <div className="nav float-right p-[3rem] text-2xl font-encode text-white">
                    <Navbar active="dashboard" />
                </div>
                <Link to="/">
                    <h1 className="text-6xl text-white  shadow-2xl font-medium p-8 font-titan">
                        {" "}
                        Easy Jobs
                    </h1>
                </Link>

                {isRecruiterLoggedIn ? (
                    <div className="profile bg-white shadow-2xl rounded-xl  p-16 ml-10 mr-10 mt-20">
                        <div className="profile-details text-left text-2xl w-[25%] rounded border-indigo-600 font-semibold border-2">
                            <h1 className="m-2 p-2"> Name : {name}</h1>
                            <h1 className="m-2 p-2"> Email Address : {email} </h1>
                        </div>

                        <div className="response-section">
                            <div className="text-3xl font-semibold m-10">
                                Jobs Posted By You
                            </div>

                            {jobposts ? jobposts.map
                                (jobpost => <div key={jobpost._id} className="rounded flex flex-row">
                                    <div className="card p-10 w-full bg-white">
                                        <div className="job-container flex flex-row m-10 shadow-2xl">
                                            <div className="role w-[50%] p-3 text-2xl font-medium ">
                                                {jobpost.jobpost_role}
                                                <div className="company text-lg p-1 bg-indigo-600 text-white rounded w-[35%] text-center">
                                                    {jobpost.jobpost_company_name}
                                                </div>
                                            </div>
                                            <div className="job-type m-3 w-[50%] text-xl font-medium p-3">
                                                {jobpost.jobpost_type} - {jobpost.jobpost_mode} - {jobpost.jobpost_location}
                                                <br />
                                                Salary : {jobpost.jobpost_pay}
                                                <br />
                                                Experience : {jobpost.jobpost_experience}
                                                <br />
                                                Duration : {jobpost.jobpost_job_duration}
                                                <br />
                                                Description : {jobpost.jobpost_job_description}
                                            </div>

                                            {/* <button className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3">
                                            Check
                                        </button> */}

                                            <button
                                                onClick={() => {
                                                    let obj = { "_id":jobpost._id};
                                                    delete_jobpost(obj).then(data => {
                                                        alert(data.message);
                                                        window.location.reload();
                                                    })
                                                }}
                                                className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3">
                                                Delete
                                            </button>

                                            <button
                                                onClick={() => {
                                                    let obj={"application_jobpost_id":jobpost._id}
                                                    get_jobpost_applications(obj).then(data=>{
                                                        if(data.tag){
                                                            console.log(data.message);
                                                            setApplicants(data.message);
                                                            console.log(applicants);
                                                        }
                                                        setIsOpen(true);
                                                    })
                                                }}
                                                className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3">
                                                View Applications
                                            </button>

                                        </div>

                                    </div>

                                    {
                isOpen && <>
                    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex drop-shadow-2xl backdrop-blur-[2px]">
                        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                            <div className='flex items-center justify-between'>
                                
                                <button

                                    onClick={() => {setIsOpen(false); setApplicants([]);}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <>Number of applications : {applicants.length}</>
                            {
                                
                                (applicants)?
                                applicants.map(applicant=><>
                                 <div className="mb-4">                       
                            <div className='text-2xl font-medium'>{applicant[0].applicant_name}</div>
                            <div className='text-xl mb-2'>({applicant[0].applicant_email})</div>
                            <div className='text-xl mb-2'>{applicant[0].applicant_description}</div>
                            <div className='text-xl mb-2'>Experience : {applicant[0].applicant_experience}</div>
                            </div>
                            </>
                                )
                                :<>"No application found"</>
                            }
                           
                            
                        </div>
                    </div>
                </>
            }


                                </div>) : ""}
                        </div>
                        {/* 
                        <div className="profile flex flex-row ml-[35%] mr-[35%] ">

                            <button className="p-4 px-6 m-10 text-2xl font-semibold bg-indigo-600 text-white rounded" onClick={() => { localStorage.removeItem("recruiter_token"); window.location.reload() }}>Logout</button>

                        </div> */}
                    </div>
                ) : (
                    <div className="post-job-container text-left relative w-[38%] shadow-xl p-10 md:rounded-md mx-auto min-w-fitrounded-xl mt-10 text-2xl bg-[#ffffff]">
                        "You are not logged in ,{" "}
                        <Link
                            className="font-medium text-indigo-700 underline underline-offset-1"
                            to="/login"
                        >
                            Login
                        </Link>{" "}
                        as <span className="font-semibold">Recruiter</span> to continue"
                    </div>
                )}
            </div>
        </>
    );
}
