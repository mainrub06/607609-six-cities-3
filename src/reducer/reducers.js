import {combineReducers} from "redux";
// import NameSpace from "./name-space";
import {reducer as data} from "./data/data";
import {reducer as main} from "./main/main";

export default combineReducers({data, main});
