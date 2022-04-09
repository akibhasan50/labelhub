/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
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

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => {
    console.log("form submit");
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
                  type="text"
                  label="Email"
                  placeholder="example@mail.com"
                  value={email}
                  required
                ></InputField>

                <InputField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="******"
                  label="Password"
                ></InputField>

                <CustomButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
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
