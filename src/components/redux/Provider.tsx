// Provider.tsx
import React, { createContext, useReducer, useContext } from "react";
import { AxisActionType, State, Action } from "./reducerTypes";
import {
  xAXIS_MAX,
  xAXIS_MIN,
  yAXIS_MAX,
  yAXIS_MIN,
} from "../GraphModule/Svgconstants"

const xAxisTickEvery=Math.ceil((xAXIS_MAX - xAXIS_MIN) / 50);
const yAxisTickEvery=Math.ceil((yAXIS_MAX - yAXIS_MIN) / 50);

const initialState: State = {
  zoomOutScale: 1,
  xAxisDetails: { axisMin: xAXIS_MIN, axisMax: xAXIS_MAX , tickEvery: xAxisTickEvery},
  yAxisDetails: { axisMin: yAXIS_MIN, axisMax: yAXIS_MAX ,tickEvery:yAxisTickEvery},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case AxisActionType.SET_ZOOM:
      return { ...state, zoomOutScale: action.value };
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
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useProvider = () => useContext(Context);
