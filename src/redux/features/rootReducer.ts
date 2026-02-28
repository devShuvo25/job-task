import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import authReducer from "@/redux/features/authSlice";
import themeReducer from "@/redux/features/themeSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
