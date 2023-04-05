import { Header } from "components";
import { Outlet } from "react-router-dom";

export const MainTemplate = () => {
  return (
    <>
      <Header onHoverVariant="medium" />
      <Outlet />
    </>
  );
};
