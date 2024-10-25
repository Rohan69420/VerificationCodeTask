import React, { Component, createRef } from "react";

class CodeInput extends Component {
  constructor(props) {
    super(props);
    const { length = 6 } = props;
    this.state = {
      code: new Array(length).fill(""),
    };
    this.inputRefs = Array(length).fill().map(() => createRef());
  }

  componentDidMount() {
    if (this.inputRefs[0].current) {
      this.inputRefs[0].current.focus();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // Compare current and previous code states
  //   const { code } = this.state.inputRef;
  //   const prevCode = prevState.code;

  //   // Check for changes at each index
  //   for (let i = 0; i < code.length; i++) {
  //     if (code[i] !== prevCode[i]) {
  //       console.log(`Value changed at index ${i}: ${prevCode[i]} -> ${code[i]}`);
  //     }
  //   }
  // }
  

  onSubmitClick = () => {
    const { onCodeSubmit = () => {} } = this.props;
    const { code } = this.state;

    // Empty values check
    if (code.indexOf("") >= 0) return;
    onCodeSubmit(code);
  };

  handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      // Client-side validation for Non-Numeric Value; Change color to red
      this.inputRefs[index].current.style.outline = "2px solid red";
      return;
    }

    // Reset the style of the input box if numeric
    this.inputRefs[index].current.style.outline = "";

    const newCode = [...this.state.code];
    // Validation for only one input per input field
    newCode[index] = value.substring(value.length - 1);
    this.setState({ code: newCode });

    // Flash combined code on console after length of 6 is reached
    const combineCode = newCode.join("");
    if (combineCode.length === this.props.length) {
      console.log(combineCode);
    }

    // Auto move to next input field
    if (value && index < this.props.length - 1 && this.inputRefs[index + 1].current) {
      this.inputRefs[index + 1].current.focus();
    }
  };

  handleClick = (index) => {
    this.inputRefs[index].current.setSelectionRange(1, 1);

    // Auto move on click to the earliest encounter of empty field; leave no spaces in between
    if (index > 0 && !this.state.code[index - 1]) {
      this.inputRefs[this.state.code.indexOf("")].current.focus();
    }
  };

  handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !this.state.code[index] &&
      index > 0 &&
      this.inputRefs[index - 1].current
    ) {
      this.inputRefs[index - 1].current.focus();
    }
  };

  render() {
    const { code } = this.state;

    return (
      <div className="container">
        <div>
          {code.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={this.inputRefs[index]}
                value={value}
                onChange={(event) => this.handleChange(index, event)}
                onClick={() => this.handleClick(index)}
                onKeyDown={(event) => this.handleKeyDown(index, event)}
                className="code-field"
              />
            );
          })}
        </div>

        <div>
          <button className="submit-button" onClick={this.onSubmitClick}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default CodeInput;
