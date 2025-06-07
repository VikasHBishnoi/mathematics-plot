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
  xAxisTickCount,
  yAXIS_MAX,
  yAXIS_MIN,
  yAxisTickCount,
} from "./Svgconstants";

interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const GraphSvg: React.FC<GraphCanvasProps> = ({ expressionArray }) => {
  const { state, dispatch } = useProvider();

  useEffect(() => {
    // Calculate axis values and tickEvery only once
    const xAxisMin = Math.round(xAXIS_MIN * state.zoomOutScale);
    const xAxisMax = Math.round(xAXIS_MAX * state.zoomOutScale);
    const yAxisMin = Math.round(yAXIS_MIN * state.zoomOutScale);
    const yAxisMax = Math.round(yAXIS_MAX * state.zoomOutScale);

    const xTickEvery = Math.ceil((xAxisMax - xAxisMin) / xAxisTickCount);
    const yTickEvery = Math.ceil((yAxisMax - yAxisMin) / yAxisTickCount);

    dispatch({
      type: AxisActionType.SET_X_AXIS,
      value: {
        axisMin: xAxisMin,
        axisMax: xAxisMax,
        tickEvery: xTickEvery,
      },
    });
    dispatch({
      type: AxisActionType.SET_Y_AXIS,
      value: {
        axisMin: yAxisMin,
        axisMax: yAxisMax,
        tickEvery: yTickEvery,
      },
    });
  }, [state.zoomOutScale]);

  return (
    <div className="main-canvas-area">
      <svg
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        style={{ background: "#f9f9f9", border: "1px solid #ccc" }}
      >
        <AxisComponent />
      </svg>
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
    </div>
  );
};

export default GraphSvg;
