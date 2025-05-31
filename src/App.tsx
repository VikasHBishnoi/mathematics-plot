import React, { useState, ChangeEvent } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="app-container">
      <Header title="Mathematics Plot" />
      <main className="main-content">
        <input
          type="text"
          className="function-input"
          placeholder="Enter your function here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <p className="typed-text">
          You typed: <strong>{inputValue}</strong>
        </p>
      </main>
      <Footer text="Made With Love" />
    </div>
  );
};

export default App;
