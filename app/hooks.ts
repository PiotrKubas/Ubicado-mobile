import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { RootState, AppDispatch } from "./store";

export type ReduxDispatch = ThunkDispatch<AppDispatch, any, Action>;
export const useAppDispatch = () => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
