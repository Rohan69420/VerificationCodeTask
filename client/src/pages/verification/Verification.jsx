import { Component } from "react";
import PropTypes from "prop-types";
import View from "./View";
// import CodeInput from "../../components/code-input";

const propTypes = {
  verifyCode: PropTypes.func
}

const defaultProps = {
  verifyCode: () => null
}

class Verification extends Component {
  constructor(props) {
    super(props);
    this.codeLength = 6;
  }

  handleCodeSubmit = (code) => {
    //event.preventDefault();
    const { verifyCode } = this.props;

    verifyCode( code )
      .then((response) => {
        this.handleSuccessResponse(response);
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleSuccessResponse = (response) =>{
  }

  handleError = (error) =>{

  }

  render() {
    return( <View onCodeSubmit={this.handleCodeSubmit}></View>);
  }
}

Verification.propTypes = propTypes;
Verification.defaultProps = defaultProps;

export default Verification;