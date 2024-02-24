import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import Board from "./components/board/Board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Board />,
    children: [
      // code to be added
    ],
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
