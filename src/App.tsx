import React, { useState, ChangeEvent } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import ActivityArea from "./components/ActivtiyArea/ActivityArea";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header title="Mathematics Plot" />
      <ActivityArea />
      <Footer text="Made With Love" />
    </div>
  );
};

export default App;
