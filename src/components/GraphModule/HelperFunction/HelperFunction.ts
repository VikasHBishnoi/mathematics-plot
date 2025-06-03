import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Svgconstants";

export const xToSvg = (x: number, AXIS_MIN: number, AXIS_MAX: number): number => {
    const viewBoxX = ((x - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * CANVAS_WIDTH;
    return viewBoxX;
}

export const yToSvg = (y: number, AXIS_MIN: number, AXIS_MAX: number) => {
    const viewBoxY = CANVAS_HEIGHT - ((y - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * CANVAS_HEIGHT;
    return viewBoxY;
}