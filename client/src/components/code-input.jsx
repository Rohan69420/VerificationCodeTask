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
    //Check if any empty fields
    if (code.indexOf("") >= 0) return;

    onCodeSubmit(code);
  };

  const validityMarker = (value, index) => {
    // avoid in-line css changes
    if (isNaN(value)) {
      // mark invalid
      inputRefs.current[index].style.outline = "2px solid red";
      return false;
    } else {
      // valid marker : clear the style
      inputRefs.current[index].style.outline = "";
      return true;
    }
  };

  const inputParser = (value) => {
    const newCode = [...code];

    //Only taking one input at a time
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Debug \|/
    const combineCode = newCode.join("");
    if (combineCode.length === length) {
      console.log(combineCode);
    }
  };

  const moveCursor = (index, value) => {
    //Auto move to next input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleChange = (index, event) => {
    /* Ideally we would want the functions to be as follows:
      > validityHandler
      > inputParser <--- can have the added functionality to handle clipboard data
      > immediateNextFieldSelector <--- select the last field if complete or skip to the length-size
    */
    const value = event.target.value;

    if (!validityMarker(value, index)) {
      // don't call the remaining functions if invalid
      return;
    }
    inputParser(value);
    moveCursor(value, index);
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    selectFirstEmptyField(index);
  };

  const selectFirstEmptyField = (index) => {
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
