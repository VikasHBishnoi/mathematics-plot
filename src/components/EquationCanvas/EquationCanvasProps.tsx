// EquationCanvas.tsx
import React from "react";
import { ExpressionInterface } from "../../Interface";

interface EquationCanvasProps {
  expression: ExpressionInterface;
}

//TODO: This component need to be re-written shuch that is more beautiful and responsive. Currently it is just a simple text representation of the equation in span.
const EquationCanvas: React.FC<EquationCanvasProps> = ({ expression }) => {
  const { equationParamters } = expression;
  const { equationParamtersArray, constant } = equationParamters;
  // Build the equation string, e.g., "y = 2x^2 + 3x + 5"
  const terms = equationParamtersArray
    .map((param, idx) => {
      const { coefficient, power } = param;
      if (coefficient === 0) return null;
      let coefStr =
        coefficient === 1 && power !== 0
          ? ""
          : coefficient === -1 && power !== 0
            ? "-"
            : coefficient;
      let powerStr = power === 0 ? "" : power === 1 ? "x" : `x^${power}`;
      return `${coefStr}${powerStr}`;
    })
    .filter(Boolean);

  if (constant !== 0) {
    terms.push(constant.toString());
  }

  const equationStr = `y = ${terms.join(" + ").replace(/\+\s\-/g, "- ")}`;

  return (
    <div className="equation-canvas">
      <span style={{ fontSize: "1.2rem", fontFamily: "serif" }}>
        {equationStr}
      </span>
    </div>
  );
};

export default EquationCanvas;
