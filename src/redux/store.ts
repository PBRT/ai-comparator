import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { createStore, applyMiddleware } from "redux";

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...[thunk, logger])
  );
}
