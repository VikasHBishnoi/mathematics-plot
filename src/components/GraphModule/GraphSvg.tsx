import React, { useEffect } from "react";
import { ExpressionInterface } from "../../Interface";
import "./GraphSvg.scss";
import AxisComponent from "./Axis/AxisComponent";
import { useProvider } from "../redux/Provider";
import { AxisActionType } from "../redux/reducerTypes";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  xAXIS_MAX,
  xAXIS_MIN,
  yAXIS_MAX,
  yAXIS_MIN,
} from "./Svgconstants";

interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const MainCanvasArea: React.FC<GraphCanvasProps> = ({ expressionArray }) => {
  const { state, dispatch } = useProvider();

  // Update axis details in global state when zoomOutScale changes
  useEffect(() => {
    dispatch({
      type: AxisActionType.SET_X_AXIS,
      value: {
        AXIS_MIN: Math.round(xAXIS_MIN * state.zoomOutScale),
        AXIS_MAX: Math.round(xAXIS_MAX * state.zoomOutScale),
      },
    });
    dispatch({
      type: AxisActionType.SET_Y_AXIS,
      value: {
        AXIS_MIN: Math.round(yAXIS_MIN * state.zoomOutScale),
        AXIS_MAX: Math.round(yAXIS_MAX * state.zoomOutScale),
      },
    });
  }, [state.zoomOutScale, dispatch]);

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
        <p>Zoom Level: {state.zoomOutScale}x</p>
        <button
          onClick={() => {
            dispatch({
              type: AxisActionType.SET_ZOOM,
              value: Math.round((state.zoomOutScale - 0.1) * 100) / 100,
            });
          }}
          disabled={state.zoomOutScale <= 1}
        >
          Zoom In
        </button>
        <button
          onClick={() => {
            dispatch({
              type: AxisActionType.SET_ZOOM,
              value: Math.round((state.zoomOutScale + 0.1) * 100) / 100,
            });
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
        <AxisComponent />
      </svg>
    </div>
  );
};

export default MainCanvasArea;
