import React, { useRef } from "react";
import "../App.css";

const RegisterYourApplicationForm = (props) => {
  // Use Refs to capture input values: 
  const userName = useRef();
  const userEmail = useRef();
  const userOrderNum = useRef();
  const reasonForReturn = useRef();

  const handleSubmit = (event) => {
    // Prevents the default form submission behavior
    event.preventDefault(); 

    // collect input values
    const allUserInfo = {
      name: userName.current.value,
      email: userEmail.current.value,
      orderNumber: userOrderNum.current.value,
      reason: reasonForReturn.current.value,
    };
    // Pass the data to the parent component
    props.onSubmit(allUserInfo); 
  };

  return (
    // pass my event handler here
    <form onSubmit={handleSubmit}>
      <h2>Please be specific in your reasons for returning your item</h2>

      <label>Name*:</label>
      <input type="text" required placeholder="Name" ref={userName}/>

      <label>Email*:</label>
      <input type="email" required placeholder="Email" ref={userEmail}/>

      <label>Order Number:</label>
      <input
        type="number"
        required
        min="0"
        placeholder="Please Enter the Number of your ticket"
        ref={userOrderNum}
      />

      <label>Reason for Return: </label>
      <textarea name="reason" required ref={reasonForReturn}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterYourApplicationForm;
