import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { State } from "../../types/global";
import Head from "../Head";
import "./style.scss";

const Layout: React.FC = () => {
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
