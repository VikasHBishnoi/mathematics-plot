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
      <Footer />
    </div>
  );
};

export default App;
