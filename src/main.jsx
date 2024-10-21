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
import HomeEmployerPage from "./pages/HomePage/HomeEmployerPage.jsx";
import RegisterEmployer from "./pages/Register/RegisterEmployerPage.jsx";
import LoginEmployerPage from "./pages/Login/LoginEmployerPage.jsx";
import PostJob from "./pages/PostJob/PostJob.jsx";
import Profile from "./pages/ProfileUser/Profile.jsx";
import ManageCompany from "./pages/ManagerCompany/ManageCompany.jsx";
import AddJob from "./pages/ManageJobs/AddJob/AddJob.jsx";
import ListJob from "./pages/ManageJobs/ListJob/ListJob.jsx";
import ListUnacceptedJobs from "./pages/Admin/ManageJobs/ListUnacceptedJobs/ListUnacceptedJobs.jsx";
import ListAcceptedJobs from "./pages/Admin/ManageJobs/ListAcceptedJobs/ListAcceptedJobs.jsx";
import ViewDetailJob from "./pages/ManageJobs/ListJob/ViewDetailJob.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/profile/:id",
                element: <Profile />,
            },
        ],
    },
    {
        path: "register-user",
        element: <RegisterUserPage />,
    },
    {
        path: "register-employer",
        element: <RegisterEmployer />,
    },
    {
        path: "login-user",
        element: <LoginUserPage />,
    },
    {
        path: "login-employer",
        element: <LoginEmployerPage />,
    },
    {
        path: "admin",
        element: <AdminPage />,
        children: [
            {
                path: "list-no-public-job",
                element: <ListUnacceptedJobs />
            },
            {
                path: "list-public-job",
                element: <ListAcceptedJobs />
            },
        ]
    },
    {
        path: "homepostjob",
        element: <HomeEmployerPage />,
    },
    {
        path: "postjob",
        element: <PostJob />,
        children: [
            {
                path: "manage-company",
                element: <ManageCompany />,
            },
            {
                path: "add-job",
                element: <AddJob />
            },
            {
                path: "list-jobs",
                element: <ListJob />
            },
            {
                path: "job-detail/:id",
                element: <ViewDetailJob />
            }
        ],
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
