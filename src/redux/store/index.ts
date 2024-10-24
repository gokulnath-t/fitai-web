import { combineSlices, configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/appSlice";
import { createLogger } from "redux-logger";
const rootReducer = combineSlices({
  app: appSlice,
});
const Store = configureStore({
  reducer: rootReducer,
  middleware: (defLogger) => defLogger().concat(createLogger()),
});
export default Store;
export const { dispatch, getState, subscribe } = Store;
export type RootState = ReturnType<typeof Store.getState>;
