import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import RecruitmentPage from './pages/HomePage/RecruitmentPage.jsx';
import JobDetail from './pages/HomePage/JobDetail.jsx';
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
        path: 'recruitments',
        element: <RecruitmentPage />
      },
      {
        path: 'job-detail/:jobId',
        element: <JobDetail />,
      },
      {
        path: 'company-detail/:jobId',
        element: <CompanyDetail />
      },
      {
        path: '/applied-recruitments',
        element: <AppliedApplication/>
      }
    ],
  },
  {
    path: "register-employer",
    element: <RegisterEmployer />,
  },
  {
    path: "login-employer",
    element: <LoginEmployerPage />,
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
  {
    path: "postjob",
    element: <PostJob />,
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
