import { AxisDetails } from "../GraphModule/SvgInterface";

export enum AxisActionType {
    SET_ZOOM = "SET_ZOOM",
    SET_X_AXIS = "SET_X_AXIS",
    SET_Y_AXIS = "SET_Y_AXIS",
    TICK_X_SCALE="TICK_X_SCALE",
    TICK_Y_SCALE="TICK_Y_SCALE",
}

export type State = {
    zoomOutScale: number;
    xAxisDetails: AxisDetails;
    tickXScale: number;
    tickYScale: number;
    yAxisDetails: AxisDetails;
};

export type Action =
    | { type: AxisActionType.SET_ZOOM; value: number }
    | { type: AxisActionType.SET_X_AXIS; value: AxisDetails }
    | { type: AxisActionType.TICK_X_SCALE; value: number }
    | { type: AxisActionType.TICK_Y_SCALE; value: number }
    | { type: AxisActionType.SET_Y_AXIS; value: AxisDetails };