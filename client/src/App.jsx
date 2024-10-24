import "./App.css";
import RequestCard from "./components/request-verification";
import Verification from "./pages/VerificationV2.jsx";

function App() {

  return (
    <div className="App">
      <h1 className="h1"> Verify Your Credentials</h1>
      {/* <RequestCard /> */}
      <Verification/>
    </div>
  );
}

export default App;
