import React from "react";
import { AxisDetails, Points } from "../SvgInterface";
import { xToSvg, yToSvg } from "../HelperFunction/HelperFunction";
import { useProvider } from "../../redux/Provider";

interface StaightLineProps {
  startPoint: Points;
  endPoint: Points;
  strokeWidth?: number;
  color?: string;
  labelProps?: {
    label: string;
    position?: Points;
    alignment?: "Up" | "Down";
  };
}

const StaightLine: React.FC<StaightLineProps> = ({
  startPoint,
  endPoint,
  strokeWidth,
  color = "black",
  labelProps,
}) => {
  const { state } = useProvider();

  const xAxisMin = state.xAxisDetails.AXIS_MIN;
  const xAxisMax = state.xAxisDetails.AXIS_MAX;
  const yAxisMin = state.yAxisDetails.AXIS_MIN;
  const yAxisMax = state.yAxisDetails.AXIS_MAX;
  const x1 = xToSvg(startPoint.x, xAxisMin, xAxisMax);
  const x2 = xToSvg(endPoint.x, xAxisMin, xAxisMax);
  const y1 = yToSvg(startPoint.y, yAxisMin, yAxisMax);
  const y2 = yToSvg(endPoint.y, yAxisMin, yAxisMax);

  // Move helper functions inside the component and reduce params
  const getLabelX = () => {
    if (labelProps?.position) {
      return xToSvg(labelProps.position.x, xAxisMin, xAxisMax);
    }
    return (x1 + x2) / 2 - 15;
  };

  const getLabelY = () => {
    const baseY = labelProps?.position
      ? yToSvg(labelProps.position.y, yAxisMin, yAxisMax)
      : (y1 + y2) / 2;
    if (labelProps?.alignment === "Down") return baseY + 20;
    return baseY - 20;
  };

  const getAngle = () => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const labelX = getLabelX();
  const labelY = getLabelY();
  const angle = getAngle();

  return (
    <g>
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {labelProps && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize={14}
          fill={color}
          transform={`rotate(${angle}, ${labelX}, ${labelY})`}
        >
          {labelProps.label}
        </text>
      )}
    </g>
  );
};

export default StaightLine;
