import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/home";
import Register from "../components/Register/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default Router;
