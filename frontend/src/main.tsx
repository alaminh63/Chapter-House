import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/routes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import GoTopButton from "./component/GoTopButton/GoTopButton";

createRoot(document.getElementById("root")!).render(
  <div>
    <Provider store={store}>
      <HelmetProvider>
        <StrictMode>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
          <Toaster />
          <GoTopButton />
        </StrictMode>
      </HelmetProvider>
    </Provider>
  </div>
);
