import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initalState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  //import compose to enable redux devtools
  compose(
    applyMiddleware(...middleware),
    //enables redux devtools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
