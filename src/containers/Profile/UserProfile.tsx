import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { ActionButton } from "../../components/Button/ActionButton";
import { InputField } from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner/Spinner";
import { resetUser, updateCurrentUser } from "../../features/user/userSlice";
import { SelectField } from "./../../components/SelectField/SelectField";
import { roleCheck } from "./../../utils/userRoles";
import { ICurrentUser, IGender } from "./currentUserType";
import "./UserProfile.css";
export const UserProfile = () => {
  const [smallIdentifier, setSmallIdentifier] = useState("LH");
  const { logedinUser, isLoading, isError, message } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<ICurrentUser>({
    dob: logedinUser?.dob || "",
    email: logedinUser?.email || "",
    full_name: logedinUser?.full_name || "",
    gender: logedinUser?.gender || "",
    institution_name: logedinUser?.institution_name || "",
    phone_number: logedinUser?.phone_number || "",
    qualification: logedinUser?.qualification || "",
    role: logedinUser?.role,
  });

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (isError || message) {
      toast.error(message);
    }
    dispatch(resetUser());
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (logedinUser) {
      const charIcon = logedinUser?.full_name
        ?.match(/^(\w)\w*\s+(\w{1,1})/)
        ?.slice(1)
        ?.join("");
      setSmallIdentifier(charIcon);
    }
  }, [logedinUser]);

  //*************** update function *********** */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userUpdatedData = {
      dob: userData.dob,
      gender: userData.gender,
      institution_name: userData.institution_name,
      phone_number: userData.phone_number,
      qualification: userData.qualification,
    };
    dispatch(updateCurrentUser(userUpdatedData));
    dispatch(dispatch(resetUser()));
  };

  //**************** loading screen *********** */
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="profile-section">
      <div className="d-flex profile-info">
        <span className="profile-avtar">{smallIdentifier || "LH"}</span>
        <div className=" mx-3">
          <h6 className="profile-name p-0">{logedinUser.full_name}</h6>
          <span className="profile-email p-0">{logedinUser.email}</span>
        </div>
      </div>

      <Container className="py-4">
        <Row>
          <Col className="box-shadow rounded" lg={9}>
            <div className="row p-5">
              <div className="col-lg-5">
                <SelectField
                  onChange={handleChange}
                  label="Gender"
                  name="gender"
                  value={userData.gender}
                  options={options}
                ></SelectField>
                <InputField
                  onChange={handleChange}
                  type="text"
                  name="institution_name"
                  label="Institutions"
                  placeholder="University of Asia Pacific"
                  value={userData.institution_name}
                ></InputField>
                <InputField
                  onChange={handleChange}
                  type="text"
                  name="role"
                  label="User Type"
                  placeholder="Annotator"
                  value={roleCheck(userData.role)}
                  disabled
                ></InputField>
              </div>
              <div className="col-lg-5">
                <InputField
                  onChange={handleChange}
                  type="date"
                  label="Birthday"
                  placeholder="dd/mm/yyyy"
                  value={userData.dob}
                  name="dob"
                ></InputField>
                <InputField
                  onChange={handleChange}
                  type="text"
                  label="Education Qualification"
                  placeholder="BSc in Computer Science and Engineering"
                  value={userData.qualification}
                  name="qualification"
                ></InputField>
                <InputField
                  onChange={handleChange}
                  type="number"
                  label="Mobile"
                  placeholder="xxxxxxxxxxx"
                  value={userData.phone_number}
                  name="phone_number"
                ></InputField>
              </div>
            </div>
            <div className="d-flex">
              <ActionButton
                onClick={handleSubmit}
                className="btn profile-btn mx-5 mb-3"
              >
                Update
              </ActionButton>
              <Link to="/change_password" className=" mb-3 change-pass-btn">
                Change Password
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
