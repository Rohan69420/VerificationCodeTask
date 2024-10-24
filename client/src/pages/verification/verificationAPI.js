import * as verificationEndpoint from '../../api/api.client';
import * as constants from '../../config';

const VERIFICATION_URL = "https://verification-code-task-backend.vercel.app/verifycode";
console.log(VERIFICATION_URL);

const verificationApi = {
    // verifyCode: (code) = verificationEndpoint.post(code, VERIFICATION_URL)
};

const verifyCode = (code) =>{verificationEndpoint.post(code, VERIFICATION_URL)}; 

export default verifyCode;