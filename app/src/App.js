import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/payment/new-order", {
      amount: 50000,
      currency: "INR",
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, order_id, currency } = result.data.order;

    const paymentObject = new window.Razorpay({
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Razorpay Integration",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        console.log("PAYMENT SUCCESSFULL: ", response);
      },
      prefill: {
        name: "@Magnifiqqq",
        email: "naginbanodha@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Ahmedabad, Gujarat",
      },
      theme: {
        color: "#058616",
      },
    });
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Razor Pay</p>
        <button
          className="App-link"
          style={{ cursor: "pointer", padding: "0.5rem 1rem" }}
          onClick={displayRazorpay}
        >
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default App;
