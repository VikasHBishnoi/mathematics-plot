import React, { useEffect, useState } from "react";
import { ExpressionInterface } from "../../Interface";
import "./GraphSvg.scss";
import AxisComponent from "./Axis/AxisComponent";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  xAXIS_MAX,
  xAXIS_MIN,
  yAXIS_MAX,
  yAXIS_MIN,
} from "./Svgconstants";
import { AxisDetails } from "./SvgInterface";
interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const MainCanvasArea: React.FC<GraphCanvasProps> = ({ expressionArray }) => {
  const [zoomOutScale, setZoomOutScale] = useState<number>(1); // Placeholder for zoom level, can be used for future zoom functionality
  const [yAxisDetails, setYAxisDetails] = useState<AxisDetails>({
    AXIS_MIN: yAXIS_MIN,
    AXIS_MAX: yAXIS_MAX,
  });
  const [xAxisDetails, setXAxisDetails] = useState<AxisDetails>({
    AXIS_MIN: xAXIS_MIN,
    AXIS_MAX: xAXIS_MAX,
  });

  useEffect(() => {
    setXAxisDetails({
      AXIS_MIN: Math.round(xAXIS_MIN * zoomOutScale),
      AXIS_MAX: Math.round(xAXIS_MAX * zoomOutScale),
    });

    setYAxisDetails({
      AXIS_MIN: Math.round(yAXIS_MIN * zoomOutScale),
      AXIS_MAX: Math.round(yAXIS_MAX * zoomOutScale),
    });
  }, [zoomOutScale]);

  return (
    <div className="main-canvas-area">
      <h2>Main Canvas Area</h2>
      <div>
        {expressionArray.map((expression, index) => (
          <div key={"expressioncanvas" + index} className="expression-item">
            {expression.isEquationShown && (
              <p>{`Equation: ${expression.equationInputStr}`}</p>
            )}
          </div>
        ))}
      </div>
      <div className="zoom-level">
        <p>Zoom Level: {zoomOutScale}x</p>
        <button
          onClick={() => {
            setZoomOutScale((prv) => Math.round((prv - 0.1) * 100) / 100);
          }}
          disabled={zoomOutScale <= 1}
        >
          Zoom In
        </button>
        <button
          onClick={() => {
            setZoomOutScale((prv) => Math.round((prv + 0.1) * 100) / 100);
          }}
        >
          Zoom Out
        </button>
      </div>
      <svg
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ background: "#f9f9f9", border: "1px solid #ccc" }}
      >
        <AxisComponent
          yAxisDetails={yAxisDetails}
          xAxisDetails={xAxisDetails}
        />
      </svg>
    </div>
  );
};

export default MainCanvasArea;
