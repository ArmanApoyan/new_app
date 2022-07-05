import { Outlet, useLocation } from "react-router-dom";
import Head from "../Head";
import React from "react";
import "./style.scss";


const Layout: React.FC = (props) => {
  const location = useLocation()
  return (
    <>
      {location.pathname=="/" && <Head />}
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
