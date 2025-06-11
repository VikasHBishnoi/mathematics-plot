import React from "react";
import { ExpressionInterface } from "../../../Interface";
import { useProvider } from "../../redux/Provider";
import { xToSvg, yToSvg } from "../HelperFunction/HelperFunction";

interface DrawExpressionProps {
  expression: ExpressionInterface;
  color?: string;
  step?: number; // How fine the points are (smaller = smoother)
}

const DrawExpression: React.FC<DrawExpressionProps> = ({
  expression,
  color = "blue",
  step = 0.1,
}) => {
  const { state } = useProvider();
  const { axisMin: xMin, axisMax: xMax } = state.xAxisDetails;
  const { axisMin: yMin, axisMax: yMax } = state.yAxisDetails;

  // Evaluate the polynomial at x
  const evaluate = (x: number) => {
    let sum = 0;
    for (const param of expression.equationParamters.equationParamtersArray) {
      const currentElement = param.coefficient * Math.pow(x, param.power);
      sum += currentElement;
    }
    sum += expression.equationParamters.constant;
    return sum;
  };

  const hasFractionalPower = () => {
    return expression.equationParamters.equationParamtersArray.some(
      (param) => param.power < 1 && param.power > -1
    );
  };

  // Generate points
  const points: { x: number; y: number }[] = [];
  const loopStart = hasFractionalPower() ? 0 : xMin;

  for (let x = loopStart; x <= xMax; x += step) {
    const y = evaluate(x);
    points.push({ x: xToSvg(x, xMin, xMax), y: yToSvg(y, yMin, yMax) });
  }

  // Convert points to SVG polyline string
  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <polyline points={pointsStr} fill="none" stroke={color} strokeWidth={2} />
  );
};

export default DrawExpression;
