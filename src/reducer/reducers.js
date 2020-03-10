import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as main} from "./main/main";
import {reducer as user} from "./user/user";

export default combineReducers({data, main, user});
