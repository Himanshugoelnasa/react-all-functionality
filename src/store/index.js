import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "auth",
  storage: storageSession, // 🔥 PER TAB STORAGE
};

const persistedAuthReducer = persistReducer(
  persistConfig,
  userReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
