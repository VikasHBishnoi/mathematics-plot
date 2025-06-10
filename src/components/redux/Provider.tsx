import React, { createContext, useReducer, useContext, useMemo } from "react";
import { AxisActionType, State, Action } from "./reducerTypes";
import {
  tickEvery,
  xAxisNegativeTickCount,
  xAxisPositiveTickCount,
  yAxisNegativeTickCount,
  yAxisPositiveTickCount,
} from "../GraphModule/Svgconstants";

const initialState: State = {
  zoomOutScale: 1,
  tickXScale: 1,
  tickYScale: 1,
  xAxisDetails: {
    axisMin: -tickEvery * xAxisNegativeTickCount,
    axisMax: tickEvery * xAxisPositiveTickCount,
  },
  yAxisDetails: {
    axisMin: -tickEvery * yAxisNegativeTickCount,
    axisMax: tickEvery * yAxisPositiveTickCount,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case AxisActionType.SET_ZOOM:
      return { ...state, zoomOutScale: action.value };
    case AxisActionType.TICK_X_SCALE:
      return { ...state, tickXScale: action.value };
    case AxisActionType.TICK_Y_SCALE:
      return { ...state, tickYScale: action.value };
    case AxisActionType.SET_X_AXIS:
      return { ...state, xAxisDetails: action.value };
    case AxisActionType.SET_Y_AXIS:
      return { ...state, yAxisDetails: action.value };
    default:
      return state;
  }
}

const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useProvider = () => useContext(Context);
