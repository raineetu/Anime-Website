// src/index.js
import { createRoot } from "react-dom/client"; // Ensure this import is correct
import { Provider } from "react-redux";
import store from "./Components/redux/store"; // Make sure the path is correct
import App from "./App"; // Adjust if your App component is in a different location
import "./index.css"; // Your CSS file
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from './Components/auth/AuthProvider'; // Import AuthProvider

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </PersistGate>
  </Provider>
);
