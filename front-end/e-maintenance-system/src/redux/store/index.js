import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "../reducers";
import thunk from "redux-thunk";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // continue regardless of error
  }
}

// load from local storage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return {};
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

const preloadedState = loadFromLocalStorage();

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const configureStore = () => {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(...enhancers)
  );
  store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });

  return store;
};

export default configureStore;
