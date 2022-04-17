/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import bcclogo from "../../assets/images/bcc.png";
import digitalbd from "../../assets/images/digitalbd.png";
import ictdiv from "../../assets/images/ictdiv.png";
import "./LoginForm.css";
import { useState } from "react";
import { InputField } from "../../components/InputField/InputField";
import { Image } from "../../components/Image/Image";
import { CustomButton } from "./../../components/Button/CustomButton";
import { Footer } from "../../components/Footer/Footer";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center align-items-center login-form ">
            <Col xs={5} className="shadow-lg login-container">
              <div className="text-center ">
                <h1 className="login-title">Label Hub</h1>
                <h4 className="login-subtitle">Sign in</h4>
              </div>

              <Form>
                <InputField
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  type="text"
                  label="Email"
                  placeholder="example@mail.com"
                  value={email}
                  required
                ></InputField>
                <p
                  className={
                    emailFocus && email && !validEmail
                      ? "d-block text-danger"
                      : "d-none"
                  }
                >
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <InputField
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  value={password}
                  type="password"
                  placeholder="******"
                  label="Password"
                ></InputField>
                <p
                  className={
                    passFocus && password && !validPassword
                      ? "d-block text-danger"
                      : "d-none"
                  }
                >
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                </p>
                <CustomButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!validEmail || !validPassword ? true : false}
                >
                  Submit
                </CustomButton>
                <a href="#" className="text-center forgot-pass">
                  {" "}
                  <span>Forgot Password?</span>
                </a>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="justify-content-center align-items-center ">
            <Col xs={5}>
              <Row className="justify-content-center align-items-center ">
                <Image
                  className="login-logos"
                  src={digitalbd}
                  alt="digital bangladesh"
                ></Image>
                <Image
                  className="login-logos"
                  src={ictdiv}
                  alt="ict division"
                ></Image>
                <Image className="login-logos" src={bcclogo} alt="bcc"></Image>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Footer></Footer>
      </section>
    </>
  );
};
