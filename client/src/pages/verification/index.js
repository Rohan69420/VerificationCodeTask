import { compose } from 'react-recompose';
import Verification from './Verification.jsx';
import verificationApi from './verificationApi.jsx';

export default compose(verificationApi)(Verification);