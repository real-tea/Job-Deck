import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";


const Router = () => {

   return(
       <>
       <BrowserRouter>
           <Routes>

               <Route exact path ="/" element = {<Home/>}/>
               <Route exact path ="/signup" element = {<Signup/>}/>
               <Route exact path ="/login" element = {<Login/>}/>
               {/* <Route exact path ="/jobs" element = {<Jobs/>}/>
               <Route exact path ="/postjobs" element = {<PostJobs/>}/>
               
               

               <Route exact path ="/applicant/dashboard" element = {<Applicant/>}/>
               <Route exact path ="/recruiter/dashboard" element = {<Recruiter/>}/> */}

           </Routes>
       </BrowserRouter>
       </>
   )

}

export default Router;