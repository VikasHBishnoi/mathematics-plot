import React, { useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import GraphSvg from "../GraphModule/GraphSvg";
import "./ActivityArea.scss";
import { ExpressionInterface } from "../../Interface";
import { Provider } from "../redux/Provider";
const ActivityArea: React.FC = () => {
  const [expressionArray, setExpressionArray] = useState<ExpressionInterface[]>(
    [
      {
        equationInputStr: "10x+2",
        isEquationShown: false,
        equationParamters: {
          equationParamtersArray: [
            {
              power: 1,
              coefficient: 10,
            },
          ],
          constant: 2,
        },
      },
      {
        equationInputStr: "x^3+2",
        isEquationShown: false,
        equationParamters: {
          equationParamtersArray: [
            {
              power: 3,
              coefficient: 1,
            },
          ],
          constant: 2,
        },
      },
    ]
  );
  return (
    <Provider>
      <main className="activity-area">
        <LeftPanel
          expressionArray={expressionArray}
          setExpressionArray={setExpressionArray}
        />
        <GraphSvg expressionArray={expressionArray} />
      </main>
    </Provider>
  );
};

export default ActivityArea;
