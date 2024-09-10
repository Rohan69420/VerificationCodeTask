import { useState, useEffect } from "react";
import "./App.css";
import RequestCard from "./components/request-verification";

function App() {

  return (
    <div className="App">
      <h1 className="h1"> Verify Your Credentials</h1>
      <RequestCard />
    </div>
  );
}

export default App;
