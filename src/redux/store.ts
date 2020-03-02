import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { createStore, applyMiddleware } from "redux";

// Enable logger only on development
const isDev = process.env.NODE_ENV === "development";

const middlewares = [thunk];
const devMiddlewares = isDev ? [logger] : [];

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...[...middlewares, ...devMiddlewares])
  );
}
