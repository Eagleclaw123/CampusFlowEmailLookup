import React from "react";
import "./App.css";
import AccountDeletionForm from "./components/DeletionForm";
import CampusFlowEmailChecker from "./components/EmailChecker";

function App() {
  return (
    <div className="App">
      {/* <AccountDeletionForm />
       */}
      <CampusFlowEmailChecker />
    </div>
  );
}

export default App;
