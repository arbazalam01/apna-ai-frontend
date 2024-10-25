import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Test from "@routes/test";
import AdminDashboard from "@routes/admindashboard";
import Overview from "@routes/overview";
import CreatorsPage from "@routes/creator";
import SidebarMenu from "@components/SidebarMenu";
import SidebarMenuforAdmin from "@components/SidebarMenuforAdmin";
import AppLayout from "@routes/loginPage";
import ResetPassword from "@routes/resetpassword";
import ForgotPassword from "@routes/forgetpassword";
import UsersPage from "@routes/users";
import RolesPage from "@routes/roles";
import MUITheme from "@utils/MUITheme";
import CalendarPage from "@routes/calendar";
import CreateCampaign from "./routes/createcampaign";
import DataInsights from "./routes/datainsights";
import "../styles/global.css";
import Reports from "./routes/reports";
import Combinedreport from "./routes/combinedreport";
import CompanyDetails from "./routes/companydetails";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "universal-cookie";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignupLayout from "./routes/signupPage";
import MainCreateCompany from "../components/CreateCompany/MainCreateCompany";
import Index from "../components/DownloadPDF/newpdf";
import PublicRoute from "./routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/signup",
    element: <SignupLayout />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<AppLayout />} />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },

  {
    path: "/admindashboard",
    element: <ProtectedRoute element={<SidebarMenuforAdmin />} />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/addcompany",
    element: <ProtectedRoute element={<MainCreateCompany />} />,
    children: [
      {
        path: "",
        element: <MainCreateCompany />,
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/generatepdf/:companyId/newpdf",
    element: <Index />,
  },
  {
    path: "/:companyId",
    // element: isAuthenticated() ? <SidebarMenu /> : <Navigate to="/" />,
    element: <ProtectedRoute element={<SidebarMenu />} />,
    children: [
      {
        path: "company-details",
        element: <CompanyDetails />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "creator",
        element: <CreatorsPage />,
      },
      {
        path: "datainsight",
        element: (
          <>
            <DataInsights />
          </>
        ),
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "combinedreports",
        element: <Combinedreport />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "roles",
        element: <RolesPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "create-campaign",
        element: <CreateCampaign />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="533092038216-rm77a6b3q3tug956qs5ukb49op53v5m5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <MUITheme>
          <RouterProvider router={router} />
        </MUITheme>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
