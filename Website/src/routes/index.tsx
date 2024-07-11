import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Loader from "../components/ui/Loader";
import { ProtectedRoute } from "./ProtectedRoute";
const Home = lazy((): any => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/Auth/Signup"));
const Login = lazy(() => import("../pages/Auth/Login"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
            
          <Suspense fallback={<Loader/>}>
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
