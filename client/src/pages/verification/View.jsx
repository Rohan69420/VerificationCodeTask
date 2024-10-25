import PropTypes from 'prop-types';
//import CodeInput from '../../components/code-input';
import CodeInput from '../../components/CodeInput/CodeInput.jsx';

const propTypes = {
    onCodeSubmit: PropTypes.func,
    // verifyCode: PropTypes.func,
};

const defaultProps = {
    onCodeSubmit: () => null,
    // verifyCode: () => null,
};

const VerificationView =({...props}) => {
    const {
        onCodeSubmit,
        // verifyCode,
    } = props;

    return(
        <div>
            <CodeInput length={6} onCodeSubmit={onCodeSubmit}/>
        </div>
    );
};

VerificationView.propTypes = propTypes;
VerificationView.defaultProps = defaultProps;

export default VerificationView;