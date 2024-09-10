import React, { useState } from "react";
import CodeInput from "./code-input";
import validator from 'validator';


const RequestCard = () => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [invalidPhoneEmail,setInvalidPhoneEmail] = useState(false);

  const handleChange = (event) => {
    setPhoneEmail(event.target.value);
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    //Need to test separately for email or phone number
    if (!validator.isEmail(phoneEmail) && !validator.isMobilePhone(phoneEmail)) {
      alert("Invalid Input");
      setInvalidPhoneEmail(true);
      return;
    }

    //call BackEnd API
    //show Code field
    setShowCodeInput(true);
  };

  //After Code Submission function
  const onCodeSubmit = (code) => {
    console.log("Code Submission Successfully Invoked", code);
    sendData(code);
  };

  //POST request to back-end
  const sendData = async (code) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/verifycode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: code }), // Wrapping array in an object
      });

      if (!response.ok) {
        throw new Error("Verification Error");
      }

      const result = await response.json();
      //console.log("Success:", result);
      alert("Verification Successful!");
    } catch (error) {
      //console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      {!showCodeInput ? (
        <form onSubmit={handleSubmission} className="form-container">
          <input
            type="text"
            className="input-field"
            value={phoneEmail}
            onChange={handleChange}
            placeholder="Enter your Email or Phone Number"
          />
    
          <button type="submit" className="submit-button">
            Submit
          </button>
          {invalidPhoneEmail ? (<p className="error"> Oops! Try again. Make sure it is valid</p>) : []}
        </form>
      ) : (
        // Else case
        <div>
          <CodeInput length={6} onCodeSubmit={onCodeSubmit} />
          <p className="p">A Verification Code has been sent to {phoneEmail}</p>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
