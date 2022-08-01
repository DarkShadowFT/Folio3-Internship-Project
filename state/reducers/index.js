import {combineReducers} from "redux";
import toggleReducer from "./toggleReducer";

const reducers = combineReducers({
  state: toggleReducer
});

export default reducers