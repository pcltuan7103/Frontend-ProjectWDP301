import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import RegisterUserPage from "./pages/Register/RegisterUserPage.jsx";
import LoginUserPage from "./pages/Login/LoginUserPage.jsx";
import "./styles/global.scss";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import HomeEmployerPage from "./pages/HomePage/RecruitmentConsulting.jsx";
import RegisterEmployer from "./pages/Register/RegisterEmployerPage.jsx";
import LoginEmployerPage from "./pages/Login/LoginEmployerPage.jsx";
import PostJob from "./pages/PostJob/PostJob.jsx";
import Profile from "./pages/ProfileUser/Profile.jsx";
import RecruitmentConsulting from "./pages/HomePage/RecruitmentConsulting.jsx";
import RecruitmentPage from "./pages/HomePage/RecruitmentPage.jsx";
import JobDetail from "./pages/HomePage/JobDetail.jsx";
import CVTemplate from "./pages/CV/CVTemplate.jsx";
import CompanyDetail from "./pages/HomePage/CompanyDetail.jsx";
import Favorite from "./pages/Favorite/Favorite.jsx";
import { useSelector } from "react-redux";
import AppliedApplication from "./pages/Application/AppliedApplication.jsx";

// Protected route component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login-user" />;
};
import ManageCompany from "./pages/ManagerCompany/ManageCompany.jsx";
import AddJob from "./pages/ManageJobs/AddJob/AddJob.jsx";
import ListJob from "./pages/ManageJobs/ListJob/ListJob.jsx";
import ListUnacceptedJobs from "./pages/Admin/ManageJobs/ListUnacceptedJobs/ListUnacceptedJobs.jsx";
import ListAcceptedJobs from "./pages/Admin/ManageJobs/ListAcceptedJobs/ListAcceptedJobs.jsx";
import ViewDetailJob from "./pages/ManageJobs/ListJob/ViewDetailJob.jsx";
import VideoCall from "./pages/VideoCall/VideoCall.jsx";
import ListApplication from "./pages/ManageJobs/ListApplication/ListApplication.jsx";
import VerifyOtpUser from "./pages/VerifyOtp/VerifyOtpUserPage.jsx";
import VerifyOtpEmployer from "./pages/VerifyOtp/VerifyOtpEmployerPage.jsx";

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
            {
                path: "/favorite",
                element: (
                    <ProtectedRoute>
                        <Favorite />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/cv_profile",
                element: (
                    <ProtectedRoute>
                        <CVTemplate />
                    </ProtectedRoute>
                ),
            },
            {
                path: "recruitment-consulting",
                element: <RecruitmentConsulting />,
            },
            {
                path: "login-user",
                element: <LoginUserPage />,
            },
            {
                path: "register-user",
                element: <RegisterUserPage />,
            },
            {
                path: "verify-otp-user",
                element: <VerifyOtpUser />
            },
            {
                path: "recruitments",
                element: <RecruitmentPage />,
            },
            {
                path: "job-detail/:jobId",
                element: <JobDetail />,
            },
            {
                path: "company-detail/:jobId",
                element: <CompanyDetail />,
            },
            {
                path: "/applied-recruitments",
                element: <AppliedApplication />,
            },
            {
                path: '/interview',
                element: <VideoCall />
            }
        ],
    },
    {
        path: "register-employer",
        element: <RegisterEmployer />,
    },
    {
        path: "verify-otp-employer",
        element: <VerifyOtpEmployer />
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
                element: <ListUnacceptedJobs />,
            },
            {
                path: "list-public-job",
                element: <ListAcceptedJobs />,
            },
        ],
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
                element: <AddJob />,
            },
            {
                path: "list-jobs",
                element: <ListJob />,
            },
            {
                path: "job-detail/:id",
                element: <ViewDetailJob />,
            },
            {
                path: "list-application/:id",
                element: <ListApplication />
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
