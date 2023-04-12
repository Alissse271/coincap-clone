import { RouterProvider } from "react-router-dom";
import { Router } from "router";
import "./globalStyles.scss";

export const App = () => {
  return <RouterProvider router={Router} />;
};
