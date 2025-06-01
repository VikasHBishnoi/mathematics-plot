import React, { useEffect, useState } from "react";
import { ExpressionInterface } from "../../Interface";
import "./GraphSvg.scss";
interface GraphCanvasProps {
  expressionArray: ExpressionInterface[];
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const AXIS_MIN = -70;
const AXIS_MAX = 70;
const TICK_EVERY = 2;
const TICK_10 = 10;
const TICK_20 = 20;

const xToSvg = (x: number) =>
  ((x - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * CANVAS_WIDTH;
const yToSvg = (y: number) =>
  CANVAS_HEIGHT - ((y - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * CANVAS_HEIGHT;

type TickOrLabel =
  | { type: "xtick"; x: number; y0: number; tickLen: number; v: number }
  | { type: "xlabel"; x: number; y0: number; tickLen: number; v: number }
  | { type: "ytick"; y: number; x0: number; tickLen: number; v: number }
  | { type: "ylabel"; y: number; x0: number; tickLen: number; v: number };

const MainCanvasArea: React.FC<GraphCanvasProps> = ({ expressionArray }) => {
  const [tickData, setTickData] = useState<TickOrLabel[]>([]);

  useEffect(() => {
    const ticks: TickOrLabel[] = [];
    for (let v = AXIS_MIN; v <= AXIS_MAX; v += TICK_EVERY) {
      // X axis ticks
      let x = xToSvg(v);
      let y0 = yToSvg(0);
      let tickLen = 6;
      if (v % TICK_20 === 0) tickLen = 14;
      else if (v % TICK_10 === 0) tickLen = 10;
      ticks.push({ type: "xtick", x, y0, tickLen, v });
      if (v % TICK_20 === 0 && v !== 0) {
        ticks.push({ type: "xlabel", x, y0, tickLen, v });
      }

      // Y axis ticks
      let y = yToSvg(v);
      let x0 = xToSvg(0);
      tickLen = 6;
      if (v % TICK_20 === 0) tickLen = 18;
      else if (v % TICK_10 === 0) tickLen = 12;
      ticks.push({ type: "ytick", y, x0, tickLen, v });
      if (v % TICK_20 === 0 && v !== 0) {
        ticks.push({ type: "ylabel", y, x0, tickLen, v });
      }
    }
    setTickData(ticks);
  }, []);

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
      <svg
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ background: "#f9f9f9", border: "1px solid #ccc" }}
      >
        {/* X axis */}
        <line
          x1={0}
          y1={yToSvg(0)}
          x2={CANVAS_WIDTH}
          y2={yToSvg(0)}
          stroke="#333"
          strokeWidth={2}
        />
        {/* Y axis */}
        <line
          x1={xToSvg(0)}
          y1={0}
          x2={xToSvg(0)}
          y2={CANVAS_HEIGHT}
          stroke="#333"
          strokeWidth={2}
        />
        {/* Ticks and labels */}
        {tickData.map((tick, i) => {
          if (tick.type === "xtick") {
            return (
              <line
                key={`xtick-${tick.v}`}
                x1={tick.x}
                y1={tick.y0 - tick.tickLen / 2}
                x2={tick.x}
                y2={tick.y0 + tick.tickLen / 2}
                stroke="#333"
                strokeWidth={1}
              />
            );
          }
          if (tick.type === "xlabel") {
            return (
              <text
                key={`xlabel-${tick.v}`}
                x={tick.x}
                y={tick.y0 + tick.tickLen / 2 + 12}
                fontSize={14}
                textAnchor="middle"
                fill="#333"
              >
                {tick.v}
              </text>
            );
          }
          if (tick.type === "ytick") {
            return (
              <line
                key={`ytick-${tick.v}`}
                x1={tick.x0 - tick.tickLen / 2}
                y1={tick.y}
                x2={tick.x0 + tick.tickLen / 2}
                y2={tick.y}
                stroke="#333"
                strokeWidth={1}
              />
            );
          }
          if (tick.type === "ylabel") {
            return (
              <text
                key={`ylabel-${tick.v}`}
                x={tick.x0 - tick.tickLen / 2 - 6}
                y={tick.y + 4}
                fontSize={14}
                textAnchor="end"
                fill="#333"
                alignmentBaseline="middle"
              >
                {tick.v}
              </text>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default MainCanvasArea;
