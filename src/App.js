import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import Board from "./components/board/Board";
import { routeProtection } from "./utils/utils";
import ErrorPage from "./components/error/ErrorPage";
import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";
import SharablePage from "./components/sharable-page/SharablePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Board />,
    loader: routeProtection,
    errorElement: <ErrorPage />,
  },
  {
    path: "analytics",
    element: <Analytics />,
    loader: routeProtection,
    errorElement: <ErrorPage />,
  },
  {
    path: "settings",
    element: <Settings />,
    loader: routeProtection,
    errorElement: <ErrorPage />,
  },
  {
    path: "signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tasks/:taskId/sharable-link",
    element: <SharablePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
