import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { auth_applicant, delete_application, get_applicant_details_by_id, get_applications } from '../controllers/applicant';



export default function DashboardApplicant() {

    document.title = "Applicant-Dashboard | Easy-Jobs";

    let [isApplicantLoggedIn, setIsApplicantLoggedIn] = useState(false);
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [description, setDescription] = useState("")
    let [experience, setExperience] = useState("")
    let [applications, setjobApplications] = useState([])

    useEffect(() => {
        if (localStorage.getItem("applicant_token")) {
            let obj = {
                token: localStorage.getItem("applicant_token")
            }
            auth_applicant(obj).then(data => {
                if (data.tag) {
                    setIsApplicantLoggedIn(true);
                    let obj = { id: JSON.parse(atob(localStorage.getItem("applicant_token").split(".")[1])).id }
                    get_applicant_details_by_id(obj).then(data => {
                        setName(data.message.applicant_name);
                        setEmail(data.message.applicant_email);
                        setDescription(data.message.applicant_description);
                        setExperience(data.message.applicant_experience);
                    });
                    get_applications(obj).then(data => {
                        if (data.tag) {
                            console.log(data.message);
                            setjobApplications(data.message);
                        }
                    })
                }
                else {
                    setIsApplicantLoggedIn(false);
                }
            })
        }
      });

    




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


                {(isApplicantLoggedIn) ?
                    <div className="profile bg-white shadow-2xl rounded-xl  p-16 ml-10 mr-10 mt-20">
                        <div className="profile-details text-left text-2xl w-[30%] rounded border-indigo-600 font-semibold border-2">
                            <h1 className="m-2 p-2"> Name : {name} </h1>
                            <h1 className="m-2 p-2"> Email Address : {email} </h1>
                            <h1 className="m-2 p-2"> Description : {description} </h1>
                            <h1 className="m-2 p-2"> Experience : {experience} </h1>
                        </div>

                        <div className="response-section">
                            <div className="text-3xl font-semibold m-10">
                                Your Applications
                            </div>

                            {applications ? applications.map
                                (application => <div key={application._id} className="rounded flex flex-row">
                                    <div className="card p-10 w-full bg-white">
                                        <div className="job-container flex flex-row m-10 shadow-2xl">
                                            <div className="role w-[50%] p-3 text-2xl font-medium ">
                                                {application.jobpost_role}
                                                <div className="company text-lg p-1 bg-indigo-600 text-white rounded w-[35%] text-center">
                                                    {application.jobpost_company_name}
                                                </div>
                                            </div>
                                            <div className="job-type m-3 w-[50%] text-xl font-medium p-3">
                                                {application.jobpost_type} - {application.jobpost_mode} - {application.jobpost_location}
                                                <br />
                                                Salary : {application.jobpost_pay}
                                                <br />
                                                Experience : {application.jobpost_experience}
                                                <br />
                                                Duration : {application.jobpost_job_duration}
                                                <br />
                                                Description : {application.jobpost_job_description}
                                            </div>

                                            {/* <button className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3">
                                            Check
                                        </button> */}

                                            <button
                                                onClick={() => {
                                                    let obj = { "jobpost_id": application._id, "applicant_id": JSON.parse(atob(localStorage.getItem("applicant_token").split(".")[1])).id };
                                                    delete_application(obj).then(data => {
                                                        alert(data.message);
                                                        window.location.reload();
                                                    })
                                                }}
                                                className="check m-3 w-[50%] bg-indigo-600 rounded-xl text-white font-medium p-3">
                                                Delete
                                            </button>

                                        </div>

                                    </div>


                                </div>) : ""}

                        </div>
                        {/* <div className="profile flex flex-row ml-[35%] mr-[35%] ">

                            <button className="p-4 px-6 m-10 text-2xl font-semibold bg-indigo-600 text-white rounded" onClick={() => { localStorage.removeItem("applicant_token"); }}>Logout</button>
                        </div> */}

                    </div> :
                    <div className="apply-job-container text-left  dark:bg-[#2e2e2e] relative w-[38%] shadow-xl p-10 text-2xl md:rounded-md mx-auto min-w-fitrounded-xl mt-10  bg-[#ffffff]">
                        "You are not logged in , <Link className="font-medium text-indigo-700 underline underline-offset-1" to="/login">Login</Link> as <span className="font-semibold">Applicant</span> to continue"
                    </div>

                }


            </div>
        </>

    )
}
