import { Outlet } from "react-router-dom";
import Head from "../Head";
import React from "react";
import "./style.scss";

const Layout: React.FC<{ children?: any }> = (props) => {
  
  return (
    <>
      <Head />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
