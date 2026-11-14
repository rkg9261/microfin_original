import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import RouteErrorBoundary from "./components/ErrorBoundary/RouteErrorBoundary";
import { ConfirmProvider } from "./components/common/ConfirmModal";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils/toast.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfirmProvider>
        <RouteErrorBoundary>
          <App />
        </RouteErrorBoundary>
      </ConfirmProvider>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  </Provider>
);
