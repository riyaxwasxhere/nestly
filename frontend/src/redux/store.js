import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import studentReducer from "./studentSlice";
import ownerReducer from "./ownerSlice";
import savedReducer from "./savedSlice";
import visitReducer from "./visitSlice";
import bookingReducer from "./bookingSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  student: studentReducer,
  owner: ownerReducer,
  saved: savedReducer,
  visits: visitReducer,
  booking: bookingReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
