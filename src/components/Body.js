import React, { useState, useEffect } from "react";
import "../styles/Body.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";

import { getAllDucks } from "../api";

const Body = ({ user }) => {
  const [ducks, setDucks] = useState([]);
  const [duckCards, setDuckCards] = useState([]);
  const [duckModalShow, setDuckModalShow] = useState(false);
  const [selectedDuck, setSelectedDuck] = useState("");

  async function initDucks() {
    const duckArr = await getAllDucks();
    setDucks(duckArr);
  }

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function duckClick(props) {
    setSelectedDuck(props);
    setDuckModalShow(true);
  }

  function renderDucks() {
    if (ducks.length) {
      const duckCardArray = [];
      ducks.forEach((duck, idx) => {
        const duckCard = (
          <Card
            style={{ width: "14rem", height: "22em" }}
            className="mb-2"
            onClick={() =>
              duckClick({
                duckName: duck.name,
                duckId: duck.id,
                duckPrice: duck.price,
              })
            }
            key={idx}
          >
            <Card.Header className="cardHeader">{duck.name}</Card.Header>
            <Card.Body>
              <Card.Img src={duck.imgurl} />
              <span hidden={true}>{duck.id}</span>
            </Card.Body>
            <div className="hoverPrice text-center">
              <span id="click">{duck.price}</span>
            </div>
          </Card>
        );
        duckCardArray.push(duckCard);
      });
      setDuckCards(duckCardArray);
    }
  }

  const DuckClickModal = (props) => {
    function addToCartClick(e) {
      const quantity = e.quantity;
      const pennies = Math.round(
        100 * parseFloat(selectedDuck.duckPrice.replace(/[$,]/g, ""))
      );
      const price = quantity * pennies;
      console.log("price", price);
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedDuck.duckName} {selectedDuck.duckPrice}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(e) => {
              addToCartClick(e);
            }}
            initialValues={{
              quantity: 1,
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
                <Form.Row>
                  <Col className="my-1">
                    <Form.Label
                      className="mr-sm-2"
                      htmlFor="inlineFormCustomSelect"
                    >
                      Quantity:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                    >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                      <option value="6">Six</option>
                      <option value="7">Seven</option>
                      <option value="8">Eight</option>
                      <option value="9">Nine</option>
                      <option value="10">Ten</option>
                    </Form.Control>
                    <Button type="submit">Add To Cart</Button>
                  </Col>
                </Form.Row>
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

  useEffect(() => {
    initDucks();
  }, []);

  useEffect(() => {
    console.log("Duck change", ducks);
    renderDucks();
  }, [ducks]);

  return (
    <Container fluid>
      <Row className="bodyRow0">
        <div>Welcome, {user.username}</div>
      </Row>
      <Row className="bodyRow1">{duckCards}</Row>
      <Row className="bodyRow2">
        <Button variant="secondary" className="topButton" onClick={backToTop}>
          Back To Top
        </Button>
      </Row>
      <DuckClickModal
        show={duckModalShow}
        onHide={() => setDuckModalShow(false)}
      />
    </Container>
  );
};

export default Body;
