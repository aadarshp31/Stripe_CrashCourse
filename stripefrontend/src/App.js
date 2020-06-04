import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";

function App() {
  const initialValues = {
    name: "React Crash Course 2020",
    price: 10,
    productBy: "learncodeonline.in"
  }

  const [ product, setProduct ] = useState(initialValues);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token=""
          name="Buy Course Stripe Component"
          amount={product.price * 100}
         >
          <button className="waves-effect waves-light btn-large">Purchase with Stripe for ${product.price}</button>
         </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
