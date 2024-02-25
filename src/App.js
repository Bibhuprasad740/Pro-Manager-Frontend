import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import Board from "./components/board/Board";
import { routeProtection } from "./utils/utils";
import ErrorPage from "./components/error/ErrorPage";
import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Board />,
    loader: routeProtection,
    children: [
      // code to be added
    ],
  },
  {
    path: "analytics",
    element: <Analytics />,
    loader: routeProtection,
  },
  {
    path: "settings",
    element: <Settings />,
    loader: routeProtection,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
