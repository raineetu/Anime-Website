// store/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your authSlice reducer
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)

// Redux Persist configuration
const persistConfig = {
  key: 'root', // Root key for persisted state
  version: 1, // Version number for persisted state
  storage, // We use localStorage (or sessionStorage, depending on your needs)
};

// Combine your reducers (you can add more reducers here if needed)
const rootReducer = combineReducers({
  auth: authReducer, // Add the auth slice to the rootReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific actions
      },
    }),
});

// Create the persistor instance for syncing persisted state
export const persistor = persistStore(store);

// Export the store for use in your app
export default store;
