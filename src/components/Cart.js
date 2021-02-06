import React, { useState, useEffect } from "react";
import Header from "./Header";
import Button from "react-bootstrap/Button";

const Cart = () => {
  return (
    <div className="Cart">
      <Header />
      <Button href="/">Home</Button>
    </div>
  );
};

export default Cart;
