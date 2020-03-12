import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as main} from "./main/main";
import {reducer as user} from "./user/user";
import {reducer as reviews} from "./reviews/reviews";

export default combineReducers({data, main, user, reviews});
