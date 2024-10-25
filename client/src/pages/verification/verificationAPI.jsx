import * as verificationEndpoint from "../../api/api.client";
// import * as constants from '../../config';

const VERIFICATION_URL = "https://verification-code-task-backend.vercel.app/verifycode";
//const VERIFICATION_URL = `${verificationEndpoint.baseUrl}`;
console.log(VERIFICATION_URL);

const verificationApi = (WrappedComponent) => {
  const WithVerificationApi = (props) => {
    const verifyCode = (code) =>
      verificationEndpoint.post(code, VERIFICATION_URL);

    return <WrappedComponent {...props} verifyCode={verifyCode} />;
  };

  return WithVerificationApi;
};

export default verificationApi;
