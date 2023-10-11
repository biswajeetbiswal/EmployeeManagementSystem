import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/HOme.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminRegister from "./components/AdminRegister.jsx";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeEditForm from "./components/EmployeeEditForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <EmployeeList />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
      {
        path: "add",
        element: <EmployeeForm />,
      },
      {
        path: "edit/:employeeId",
        element: <EmployeeEditForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
