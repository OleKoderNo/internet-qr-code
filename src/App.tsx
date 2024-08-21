import React from "react";
import QRCodeGenerator from "./components/QRCodeGenerator";

const App: React.FC = () => {
  return (
    <div className="App h-screen flex items-center justify-center bg-gray-50">
      <QRCodeGenerator />
    </div>
  );
};

export default App;
