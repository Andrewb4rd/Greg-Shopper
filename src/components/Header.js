import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { login, register } from "../api";

const Header = ({ setToken, user, setUser }) => {
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [ordersShow, setOrdersShow] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.password) {
      setOrdersShow(false);
    } else {
      setOrdersShow(true);
    }
  }, [user]);

  function logout() {
    setUser({ username: "Guest" });
    setToken("");
  }

  const RegisterModal = (props) => {
    async function registerClick(e) {
      const result = await register(e);
      console.log(result);
      if (result.token) {
        setRegisterModalShow(false);
        alert(result.message);
      }
    }

    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      confPassword: yup
        .string()
        .oneOf([yup.ref("password")], null, "Passwords must match"),
    });

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(e) => {
              registerClick(e);
            }}
            initialValues={{
              username: "",
              password: "",
              confPassword: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    name="username"
                    value={values.username}
                    type="text"
                    onChange={handleChange}
                    isValid={
                      !!touched.username && !errors.username ? true : false
                    }
                    isInvalid={
                      !!touched.username && !!errors.username ? true : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={values.password}
                    type="password"
                    onChange={handleChange}
                    isValid={
                      !!touched.password && !errors.password ? true : false
                    }
                    isInvalid={
                      !!touched.password && !!errors.password ? true : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom03">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    name="confPassword"
                    value={values.confPassword}
                    type="password"
                    onChange={handleChange}
                    isInvalid={
                      values.confPassword === "" || errors.confPassword
                        ? true
                        : undefined
                    }
                    isValid={
                      values.confPassword != "" && !errors.confPassword
                        ? true
                        : undefined
                    }
                  />
                </Form.Group>
                <Row className="registerRow">
                  <Button type="submit">Register</Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const LoginModal = (props) => {
    async function loginClick(e) {
      const result = await login(e);
      console.log(result);
      if (result.token) {
        setToken(result.token);
        setUser(e);
        setLoginModalShow(false);
      }
    }

    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    });

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(e) => {
              loginClick(e);
            }}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    name="username"
                    value={values.username}
                    type="text"
                    onChange={handleChange}
                    isValid={
                      !!touched.username && !errors.username ? true : false
                    }
                    isInvalid={
                      !!touched.username && !!errors.username ? true : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={values.password}
                    type="password"
                    onChange={handleChange}
                    isValid={
                      !!touched.password && !errors.password ? true : false
                    }
                    isInvalid={
                      !!touched.password && !!errors.password ? true : false
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="loginRow">
                  <Button type="submit">Login</Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container fluid id="header">
      <Row>
        <Col className="headerColumn1">
          <div className="logoShort">TMD</div>
          <div className="logo">Too Many Ducks</div>
        </Col>
        <Col className="headerColumn2">
          <Form>
            <InputGroup>
              <Form.Control type="search" placeholder={"Search... "} />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
        <Col className="headerColumn3">
          <Row className="HC3R1">
            <div className="BG1">
              <Button onClick={() => setRegisterModalShow(true)}>
                Register{" "}
              </Button>
              <Button onClick={() => setLoginModalShow(true)}>Login </Button>
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout{" "}
              </Button>
            </div>
          </Row>
          <Row className="HC3R2">
            <div className="BG2">
              <Button hidden={true}>+duck </Button>
              <Button hidden={ordersShow}>orders </Button>
              <Button href="/Cart">cart</Button>
            </div>
          </Row>
        </Col>
      </Row>
      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </Container>
  );
};

export default Header;
