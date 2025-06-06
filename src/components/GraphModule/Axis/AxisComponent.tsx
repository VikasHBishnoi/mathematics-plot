import { useEffect, useState } from "react";
import { xToSvg, yToSvg } from "../HelperFunction/HelperFunction";
import StraightLine from "../StraightLine/StraightLine";
import { useProvider } from "../../redux/Provider";

type TickOrLabel =
  | { type: "xtick"; x: number; y0: number; tickLen: number; v: number }
  | { type: "xlabel"; x: number; y0: number; tickLen: number; v: number }
  | { type: "ytick"; y: number; x0: number; tickLen: number; v: number }
  | { type: "ylabel"; y: number; x0: number; tickLen: number; v: number };

const AxisComponent: React.FC = () => {
  const { state } = useProvider();

  const [tickData, setTickData] = useState<TickOrLabel[]>([]);
  const xAxisMin = state.xAxisDetails.axisMin;
  const xAxisMax = state.xAxisDetails.axisMax;
  const yAxisMin = state.yAxisDetails.axisMin;
  const yAxisMax = state.yAxisDetails.axisMax;
  const tickEveryXAxis = state.xAxisDetails.tickEvery;
  const tickEveryYAxis = state.yAxisDetails.tickEvery;
  // const TICK_EVERY
  useEffect(() => {
    const ticks: TickOrLabel[] = [];
    // X axis ticks and labels
    const startX = xAxisMin - (xAxisMin % tickEveryXAxis)+tickEveryXAxis;
    for (let v = startX; v <xAxisMax; v += tickEveryXAxis) {
      if(v==0){
        continue;
      }
      let x = xToSvg(v, xAxisMin, xAxisMax);
      let y0 = yToSvg(0, yAxisMin, yAxisMax);
      let tickLen = 6;
      if (v % (5 * tickEveryXAxis) === 0) tickLen = 14;
      ticks.push({ type: "xtick", x, y0, tickLen, v });
      if (v % (5 * tickEveryXAxis) === 0 && v !== 0) {
        ticks.push({ type: "xlabel", x, y0, tickLen, v });
      }
    }

    // Y axis ticks and labels
    const startY = yAxisMin - (yAxisMin % tickEveryYAxis)+tickEveryYAxis;
    for (let v = startY; v < yAxisMax; v += tickEveryYAxis) {
      if(v==0){
        continue;
      }
      let y = yToSvg(v, yAxisMin, yAxisMax);
      let x0 = xToSvg(0, xAxisMin, xAxisMax);
      let tickLen = 6;
      if (v % (5*tickEveryYAxis) === 0) tickLen = 18;
      ticks.push({ type: "ytick", y, x0, tickLen, v });
      if (v % (5*tickEveryYAxis) === 0 && v !== 0) {
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
