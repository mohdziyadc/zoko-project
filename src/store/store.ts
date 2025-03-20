import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import moviesReducer from "./slices/moviesSlice";
import favoritesReducer from "./slices/favoritesSlice";
import uiReducer, { setLoading } from "./slices/uiSlice";
import { registerLoadingCallback } from "@/lib/loadingService";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites"],
};

// Register loading callback to update the loading state
// in the api interceptors
registerLoadingCallback((isLoading) => {
  store.dispatch(setLoading(isLoading));
});

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
