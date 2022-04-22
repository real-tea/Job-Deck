import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import PostJob from '../pages/PostJob';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import DashboardApplicant from '../pages/DashboardApplicant';
import DashboardRecruiter from '../pages/DashboardRecruiter';





export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/postjob" element={<PostJob />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/applicant/dashboard" element={<DashboardApplicant />} />
          <Route exact path="/recruiter/dashboard" element={<DashboardRecruiter />} />
          

        </Routes>
      </BrowserRouter>
    </>
  );
}
