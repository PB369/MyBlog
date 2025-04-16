import { Outlet } from "react-router-dom";
import { ArticlesProvider } from "../context/ArticlesContext";

const ArticlesLayout = () => {
  return (
    <ArticlesProvider>
      <Outlet />
    </ArticlesProvider>
  );
};

export default ArticlesLayout;
