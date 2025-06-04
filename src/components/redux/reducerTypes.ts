import { AxisDetails } from "../GraphModule/SvgInterface";

export enum AxisActionType {
    SET_ZOOM = "SET_ZOOM",
    SET_X_AXIS = "SET_X_AXIS",
    SET_Y_AXIS = "SET_Y_AXIS",
}

export type State = {
    zoomOutScale: number;
    xAxisDetails: AxisDetails;
    yAxisDetails: AxisDetails;
};

export type Action =
    | { type: AxisActionType.SET_ZOOM; value: number }
    | { type: AxisActionType.SET_X_AXIS; value: AxisDetails }
    | { type: AxisActionType.SET_Y_AXIS; value: AxisDetails };