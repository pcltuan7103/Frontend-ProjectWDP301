import React, { useState } from "react";
import {
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  FileAddOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  ContainerOutlined,
  ApartmentOutlined,
  ToolOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./EmployerHeader.scss";

const logo = `/images/JobLink.png`;

const EmployerHeader = () => {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const itemsLeft = [
    {
      label: <Link to="/">Home Page</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
  ];

  const itemsRight = [
    {
      label: <Link to="/login-employer">Sign In</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: <Link to="/register-employer">Sign Up</Link>,
      key: "signup",
      icon: <UserAddOutlined />,
    },
  ];

  return (
    <div className="header-container">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={itemsLeft}
        className="menu-left"
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={itemsRight}
        className="menu-right"
      />
    </div>
  );
};

export default EmployerHeader;
