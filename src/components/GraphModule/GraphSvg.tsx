import React, { useEffect } from "react";
import { ExpressionInterface } from "../../Interface";
import "./GraphSvg.scss";
import AxisComponent from "./Axis/AxisComponent";
import { useProvider } from "../redux/Provider";
import { AxisActionType } from "../redux/reducerTypes";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  xAxisNegativeTickCount,
  xAxisPositiveTickCount,
  yAxisNegativeTickCount,
  yAxisPositiveTickCount,
} from "./Svgconstants";
import DrawExpression from "./DrawExpression/DrawExpression";
import SliderInput from "../FormElements/SliderInput/SliderInput";

interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const GraphSvg: React.FC<GraphCanvasProps> = ({ expressionArray }) => {
  const { state, dispatch } = useProvider();

  useEffect(() => {
    dispatch({
      type: AxisActionType.SET_X_AXIS,
      value: {
        axisMin: -state.tickXScale * xAxisNegativeTickCount,
        axisMax: state.tickXScale * xAxisPositiveTickCount,
      },
    });
  }, [state.tickXScale]);

  useEffect(() => {
    dispatch({
      type: AxisActionType.SET_Y_AXIS,
      value: {
        axisMin: -state.tickYScale * yAxisNegativeTickCount,
        axisMax: state.tickYScale * yAxisPositiveTickCount,
      },
    });
  }, [state.tickYScale]);

  return (
    <div className="main-canvas-area">
      <svg
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        style={{ background: "#f9f9f9", border: "1px solid #ccc" }}
      >
        {expressionArray.map((expr, idx) =>
          expr.isEquationShown ? (
            <DrawExpression key={"draw" + idx} expression={expr} color="blue" />
          ) : null
        )}
        <AxisComponent />
      </svg>
      <div className="zoom-level">
        <SliderInput
          id="zoom-slider"
          min={1}
          max={100}
          step={1}
          value={state.tickXScale}
          label="X Axis Tick Scale"
          onChange={(value) => {
            dispatch({
              type: AxisActionType.TICK_X_SCALE,
              value: value,
            });
          }}
        ></SliderInput>
        <SliderInput
          id="zoom-slider"
          min={1}
          max={100}
          step={1}
          value={state.tickYScale}
          label="Y Axis Tick Scale"
          onChange={(value) => {
            dispatch({
              type: AxisActionType.TICK_Y_SCALE,
              value: value,
            });
          }}
        ></SliderInput>
      </div>
    </div>
  );
};

export default GraphSvg;
