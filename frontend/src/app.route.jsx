import { createBrowserRouter, Navigate } from "react-router";
import Login from "./auth/pages/Login.jsx";
import Register from "./auth/pages/Register.jsx";
import Protected from "./auth/components/protected.jsx";
import Home from "./features/pages/Home.jsx";
import Interview from "./features/pages/Interview.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/homepage",
        element: <Protected><Home /></Protected>
    },
    {
         path: "/interview/:interviewId", 
    element: <Protected><Interview /></Protected>
    },
    {
        path: "*",  
        element: <Navigate to="/login" replace />
    }
])