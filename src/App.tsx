import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { LoginForm } from "./containers/login/LoginForm";

function App() {
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { fetchLogin } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="App">
      {/* <h1>{state.payload ? state.payload[0]?.name : 'Data not found'}</h1>
      <button onClick={() => fetchLogin()}>Deposit</button> */}

      <LoginForm type={""} label={""} placeholder={""} value={""}></LoginForm>
    </div>
  );
}

export default App;
