import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PaymentDetails = () => {

    // const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
  
  return (
    <div className="payment-details-page">
      <div className="container details-container" style={{ height: "100%" }}>

        <h5>
            {
                cart && cart.items && cart.items.length  && cart.totalAmount ?
                <span className="fw-bold">Итого: {Number(cart.totalAmount).toFixed(2)} руб.</span>
                : 0
            }
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
