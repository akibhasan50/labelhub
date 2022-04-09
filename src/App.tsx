import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { LoginForm } from "./containers/login/LoginForm";
import { SignupForm } from "./containers/Signup/SignupForm";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { fetchLogin } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="App">
      {/* <h1>{state.payload ? state.payload[0]?.name : 'Data not found'}</h1>
      <button onClick={() => fetchLogin()}>Deposit</button> */}

      {/* <LoginForm></LoginForm> */}
      {/* <SignupForm></SignupForm> */}
      <Navbar></Navbar>
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar></Sidebar>
          <Dashboard></Dashboard>
        </div>
      </div>
    </div>
  );
}

export default App;
