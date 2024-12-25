import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import rootReducer from './reducer';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted storage
  storage: AsyncStorage, // Using AsyncStorage for persistence in React Native
};

// Wrapping the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignoring redux-persist actions from serializable check
      },
    }),
});

export const persistor = persistStore(store); // Creating the persistor

// Defining RootState type based on the store
export type RootState = ReturnType<typeof store.getState>;