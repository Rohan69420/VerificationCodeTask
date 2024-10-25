import React, { useEffect, useRef, useState } from "react";

const CodeInput = ({ length = 6, onCodeSubmit = () => {} }) => {
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    console.log(inputRefs.current);
    if (inputRefs.current[0]) {
      //inputRefs.curent[0].focus();
    }
  }, []);

  //console.log(inputRefs);

  //Submit button function
  const onSubmitClick = () => {
    //Empty values check

    if (code.indexOf("") >= 0) return;
    onCodeSubmit(code);
  };

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      // Client-side validation for Non-Numeric Value; Change color to red
      inputRefs.current[index].style.outline = "2px solid red";
      return;
    }

    //Reset the style of the input box if numeric
    inputRefs.current[index].style.outline = "";

    const newCode = [...code];

    //Validation for only one input per input field
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    //Flash combined code on console after length of 6 is reached
    const combineCode = newCode.join("");
    if (combineCode.length === length) {
      console.log(combineCode);
    }

    //Auto move to next input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    //Auto move on click to the earliest encounter of empty field; leave no spaces in between
    if (index > 0 && !code[index - 1]) {
      inputRefs.current[code.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="container">
      <div>
      {code.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            value={value}
            onChange={(event) => handleChange(index, event)}
            onClick={() => handleClick(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className="code-field"
          />
        );
      })}
      </div>
      
      <div>
        <button className="submit-button" onClick={onSubmitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
