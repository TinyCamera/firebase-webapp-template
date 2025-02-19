import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // Ignore these paths in state
        ignoredActions: ["auth/setUser"],
        ignoredPaths: ["auth.user"],
      },
    }).concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== "production",
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

// Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
