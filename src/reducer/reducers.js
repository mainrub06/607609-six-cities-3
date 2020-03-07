import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as main} from "./main/main";

export default combineReducers({data, main});
