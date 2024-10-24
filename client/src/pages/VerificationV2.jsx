import verifyCode from "./verification/verificationAPI";
import CodeInput from "../components/code-input";

const Verification = () => {
    const hasSubmitted = (code) => {
        verifyCode(code);
    };

  return (
  <CodeInput length={6} onCodeSubmit={hasSubmitted} />
);
}

export default Verification;