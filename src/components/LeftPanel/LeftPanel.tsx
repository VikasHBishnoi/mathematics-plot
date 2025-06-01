import { SetStateAction, useState } from "react";
import ExpressionSelector from "../ExpressionSelector/ExpressionSelector";
import { ExpressionInterface } from "../../Interface";

interface LeftPanelProps {
  expressionArray: ExpressionInterface[];
  setExpressionArray: React.Dispatch<SetStateAction<ExpressionInterface[]>>;
}
const LeftPanel: React.FC<LeftPanelProps> = ({
  expressionArray,
  setExpressionArray,
}) => {
  return (
    <div className="left-panel">
      <ExpressionSelector
        expressionArray={expressionArray}
        setExpressionArray={setExpressionArray}
      ></ExpressionSelector>
    </div>
  );
};

export default LeftPanel;
