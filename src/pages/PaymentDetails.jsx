import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PaymentDetails = () => {
  // const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const orderString = localStorage.getItem("order");
  const order = orderString ? JSON.parse(orderString) : null

  console.log("Order: ", order);

  return (
    <div className="payment-details-page">
      <div className="container details-container" style={{ height: "100%" }}>
        <h5>
          {order ? (
            <span className="fw-bold">
              Итого: {Number(order.totalAmount).toFixed(2)} руб.
            </span>
          ) : (
            0 + ' руб.'
          )}
        </h5>

        <br />

        <iframe
          src="https://iceberryshop.server.paykeeper.ru/form/"
          style={{ width: "100%", border: 0 }}
        ></iframe>
      </div>
    </div>
  );
};

export default PaymentDetails;
