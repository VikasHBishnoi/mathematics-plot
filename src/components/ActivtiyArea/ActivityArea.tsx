import React, { useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import MainCanvasArea from "../GraphSvg/GraphSvg";
import "./ActivityArea.scss";
import { ExpressionInterface } from "../../Interface";
const ActivityArea: React.FC = () => {
  const [expressionArray, setExpressionArray] = useState<ExpressionInterface[]>(
    [
      {
        equationInputStr: "x+2",
        isEquationShown: false,
        equationParamters: {
          equationParamtersArray: [
            {
              power: 1,
              coefficient: 1,
            },
          ],
          constant: 2,
        },
      },
      {
        equationInputStr: "x^2+2",
        isEquationShown: false,
        equationParamters: {
          equationParamtersArray: [
            {
              power: 2,
              coefficient: 1,
            },
          ],
          constant: 2,
        },
      },
    ]
  );
  return (
    <main className="activity-area">
      <LeftPanel
        expressionArray={expressionArray}
        setExpressionArray={setExpressionArray}
      />
      <MainCanvasArea expressionArray={expressionArray} />
    </main>
  );
};

export default ActivityArea;
