import React, { useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import MainCanvasArea from "../GraphCanvas/GraphCanvas";
import "./ActivityArea.scss";
const ActivityArea: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <main className="activity-area">
      <LeftPanel inputValue={inputValue} setInputValue={setInputValue} />
      <MainCanvasArea />
    </main>
  );
};

export default ActivityArea;
