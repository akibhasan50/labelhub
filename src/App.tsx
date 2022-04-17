import React from "react";
import { LoginForm } from "./containers/login/LoginForm";
import { SignupForm } from "./containers/Signup/SignupForm";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <SignupForm></SignupForm> */}
      <Routes>
        <Route path="/" element={<SignupForm></SignupForm>}></Route>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
      </Routes>

      {/* <Navbar></Navbar>
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar></Sidebar>
          <Dashboard></Dashboard>
        </div>
      </div> */}
    </div>
  );
}

export default App;
