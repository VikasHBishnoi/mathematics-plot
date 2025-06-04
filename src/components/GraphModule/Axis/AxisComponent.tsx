import { useEffect, useState } from "react";
import { xToSvg, yToSvg } from "../HelperFunction/HelperFunction";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Svgconstants";
import { AxisDetails } from "../SvgInterface";
import StraightLine from "../StraightLine/StraightLine";
import { useProvider } from "../../redux/Provider";
const TICK_EVERY = 2;
const TICK_10 = 10;
const TICK_20 = 20;

type TickOrLabel =
  | { type: "xtick"; x: number; y0: number; tickLen: number; v: number }
  | { type: "xlabel"; x: number; y0: number; tickLen: number; v: number }
  | { type: "ytick"; y: number; x0: number; tickLen: number; v: number }
  | { type: "ylabel"; y: number; x0: number; tickLen: number; v: number };

const AxisComponent: React.FC = () => {
  const { state } = useProvider();

  const [tickData, setTickData] = useState<TickOrLabel[]>([]);
  const xAxisMin = state.xAxisDetails.AXIS_MIN;
  const xAxisMax = state.xAxisDetails.AXIS_MAX;
  const yAxisMin = state.yAxisDetails.AXIS_MIN;
  const yAxisMax = state.yAxisDetails.AXIS_MAX;
  useEffect(() => {
    const ticks: TickOrLabel[] = [];
    // X axis ticks and labels
    for (let v = xAxisMin; v <= xAxisMax; v += TICK_EVERY) {
      let x = xToSvg(v, xAxisMin, xAxisMax);
      let y0 = yToSvg(0, yAxisMin, yAxisMax);
      let tickLen = 6;
      if (v % TICK_20 === 0) tickLen = 14;
      else if (v % TICK_10 === 0) tickLen = 10;
      ticks.push({ type: "xtick", x, y0, tickLen, v });
      if (v % TICK_20 === 0 && v !== 0) {
        ticks.push({ type: "xlabel", x, y0, tickLen, v });
      }
    }

    // Y axis ticks and labels
    for (let v = yAxisMin; v <= yAxisMax; v += TICK_EVERY) {
      let y = yToSvg(v, yAxisMin, yAxisMax);
      let x0 = xToSvg(0, xAxisMin, xAxisMax);
      let tickLen = 6;
      if (v % TICK_20 === 0) tickLen = 18;
      else if (v % TICK_10 === 0) tickLen = 12;
      ticks.push({ type: "ytick", y, x0, tickLen, v });
      if (v % TICK_20 === 0 && v !== 0) {
        ticks.push({ type: "ylabel", y, x0, tickLen, v });
      }
    }

    setTickData(ticks);
  }, [xAxisMin, xAxisMax, yAxisMin, yAxisMax]);
  return (
    <g>
      <g>
        {/* X axis */}
        <StraightLine
          startPoint={{ x: xAxisMin, y: 0 }}
          endPoint={{ x: xAxisMax, y: 0 }}
          labelProps={{
            label: "X Axis",
            alignment: "Down",
          }}
        ></StraightLine>
        {/* Y axis */}
        <StraightLine
          startPoint={{ x: 0, y: yAxisMin }}
          endPoint={{ x: 0, y: yAxisMax }}
          labelProps={{
            label: "Y Axis",
            alignment: "Up",
          }}
        ></StraightLine>
      </g>

      <g>
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
                y={tick.y0 - tick.tickLen / 2 - 5}
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
                x={tick.x0 + tick.tickLen / 2 + 5}
                y={tick.y}
                fontSize={14}
                textAnchor="start"
                fill="#333"
                alignmentBaseline="middle"
              >
                {tick.v}
              </text>
            );
          }
          return null;
        })}
      </g>
    </g>
  );
};

export default AxisComponent;
