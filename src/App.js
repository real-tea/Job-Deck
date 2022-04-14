import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class App extends React.Component {
  state = {
  };

  addActiveClass = () => {
    // Adds active class to the current page
  }

  render(){
    const navBarLink = "nav-bar-link";
    return (
      <div className="App">
      {/* nav bar */}
      <div className="nav-bar">
        <div className="nav-bar-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="nav-bar-right">
          {/* <a className={ navBarLink } href="/">Home</a> */}
          <a className={ "nav-bar-link active" } href="/">Home</a>
          <a className={ "nav-bar-link " } href="/jobs">Jobs</a>
          <a className={ "nav-bar-link " } href="/postjobs">Post Jobs</a>
          <a className={ "nav-bar-login " } href="/login">Login</a>
        </div>
      </div>
    </div>
    );
  }
}

export default App;