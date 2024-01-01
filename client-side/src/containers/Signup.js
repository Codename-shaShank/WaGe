import React, { useState } from "react";
import Layout from "../components/Layout/index.layout";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Input from "../components/UI/Input";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../actions/register.actions";
import MessageBox from "../components/UI/MessageBox";
import './Signup.css'

const Signup = (props) => {
  document.title = "WaGe | Sign Up";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');


  const [messageModalShow, setMessageModalShow] = useState(false);

  const dispatch = useDispatch();

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


  const register = (e) => {
    e.preventDefault();
    const age = calculateAge(dob);

    if (age < 18) {
        // Display a popup message
        alert('You must be at least 18 years old to register.');
        return;
    }

    const userInfo = {
      userType,
      firstName,
      lastName,
      contactNumber,
      email,
      password,
      dob,
      age
    };

    dispatch(userRegister(userInfo));
    setMessageModalShow(true);
  };

  const auth = useSelector((state) => state.auth);
  const registrationStatus = useSelector((state) => state.registrationStatus);
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  if (registrationStatus.loading) {
    return (
      <Layout>
        <div className="text-center" style={{ marginTop: "60px" }}>
          <h1>Saving your info</h1>
          <Spinner animation="border" variant="success" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container style={{width:"50%"}}>
        <MessageBox
          show={messageModalShow}
          onHide={() => setMessageModalShow(false)}
          message={registrationStatus.message}
        />
        <Row style={{ marginTop: "30px" }}>
          <Col md={{ span: 6, offset: 3 }}>
        <h2 className="text-center">SIGN UP </h2>
            <Form onSubmit={register} >
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                {/* Inside the form */}
                <div className="input-field">
                  {/* <Form.Label>Date of Birth</Form.Label> */}
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
              </Row>

              <Input
                label="Contact no"
                type="tel"
                placeholder="Mobile no"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />

              <Row>
                <Col>
                  <div className="mb-3">
                    <Form.Label>Choose User Type</Form.Label>
                    <br />
                    <Form.Check
                      required
                      inline
                      type="radio"
                      name="userType"
                      label="Hirer"
                      id="Client"
                      value="client"
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      name="userType"
                      label="Worker"
                      id="Dealer"
                      value="dealer"
                      onChange={(e) => setUserType(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outline-primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Sign Up
              </Button>
              <Button
                variant="outline-success"
                type="reset"
                style={{ marginLeft: "10px" }}
              >
                Reset
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
