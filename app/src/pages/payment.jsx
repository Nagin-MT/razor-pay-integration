import React, { useState, useEffect } from "react";
import axios from "axios";
import RenderRazorpay from "./RenderRazorpay";

const Payment = () => {
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });

  const handleCreateOrder = async (amount, currency) => {
    const {
      data: { order },
    } = await axios.post("http://localhost:5000/payment/new-order", {
      amount: amount * 100, //convert amount into lowest unit. here, Dollar->Cents
      currency,
      keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
      KeySecret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
    });

    if (order && order.id) {
      setOrderDetails({
        orderId: order.id,
        currency: order.currency,
        amount: order.amount,
      });
      setDisplayRazorpay(true);
    }

    console.log(order);
  };

  console.log("displayRazorpay: ", displayRazorpay);

  return (
    <div>
      <button onClick={() => handleCreateOrder(100, "INR")}>Place Order</button>
      {displayRazorpay && (
        <RenderRazorpay
          amount={orderDetails.amount}
          currency={orderDetails.currency}
          orderId={orderDetails.orderId}
          keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
          keySecret={process.env.REACT_APP_RAZORPAY_KEY_SECRET}
        />
      )}
    </div>
  );
};

export default Payment;
