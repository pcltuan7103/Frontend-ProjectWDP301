import React from "react";
import EmployerHeader from "../../layouts/Header/EmployerHeader";
import { Outlet } from "react-router-dom";

const HomeEmployerPage = () => {
  return (
    <>
      <EmployerHeader />
      <Outlet />
    </>
  );
};

export default HomeEmployerPage;
