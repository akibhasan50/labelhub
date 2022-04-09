/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Footer } from "./../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { SelectField } from "../../components/SelectField/SelectField";
import { CustomButton } from "./../../components/Button/CustomButton";
import "./SignupForm.css";
interface SignupFormProps {}

export const SignupForm: React.FC<SignupFormProps> = ({}) => {
  const [fullName, setFullName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [genders, setGenders] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  interface IGender {
    value: string;
    label: string;
  }
  const options: Array<IGender> = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const handleSubmit = () => {
    console.log("form submit");
  };

  return (
    <>
      <section className="my-2 h-100">
        <Container>
          <Row className="justify-content-center align-items-center signup-form ">
            <Col xs={5} className="shadow-lg signup-container">
              <div className="text-center ">
                <h1 className="signup-title">Corpus Dashboard</h1>
                <h4 className="signup-subtitle">Sign up</h4>
              </div>

              <Form>
                <InputField
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  label="Full Name"
                  placeholder="Corpus"
                  value={fullName}
                  required
                ></InputField>
                <InputField
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  placeholder="example@mail.com"
                  value={email}
                  required
                ></InputField>
                <InputField
                  onChange={(e) => setMobile(e.target.value)}
                  type="text"
                  label="Mobile"
                  placeholder="xxxxxxxxxxx"
                  value={mobile}
                  required
                ></InputField>
                <InputField
                  onChange={(e) => setBirthday(e.target.value)}
                  type="date"
                  label="Birthday"
                  placeholder="xxxxxxxxxxx"
                  value={birthday}
                  required
                ></InputField>
                <SelectField
                  onChange={(e) => setGenders(e.target.value)}
                  label="Gender"
                  value={mobile}
                  options={options}
                ></SelectField>

                <InputField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="******"
                  label="Password"
                ></InputField>
                <InputField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="******"
                  label="Confirm Password"
                ></InputField>

                <CustomButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign up
                </CustomButton>
                <div className="text-center">
                  <span>
                    Already Have an Account?{" "}
                    <a className="signin-link" href="#">
                      Sign In
                    </a>
                  </span>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="my-2">
        <Footer></Footer>
      </section>
    </>
  );
};
