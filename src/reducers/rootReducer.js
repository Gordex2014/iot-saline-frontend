import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { sidebarReducer } from "./sidebarReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  nav: sidebarReducer,
  ui: uiReducer,
  user: userReducer,
});
