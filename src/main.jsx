import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import RegisterUserPage from "./pages/Register/RegisterUserPage.jsx";
import LoginUserPage from "./pages/Login/LoginUserPage.jsx";
import "./styles/global.scss";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "register-user",
    element: <RegisterUserPage />,
  },
  {
    path: "login-user",
    element: <LoginUserPage />,
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
