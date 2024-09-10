import React, { useState } from "react";
import {
  LoginOutlined,
  FileAddOutlined,
  HomeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(doLogout()); // Dispatch logout action to update Redux state
    navigate("/");
  };

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(isAuthenticated === false
      ? [
          {
            label: <Link to="/login-user">Sign In</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
          {
            label: <Link to="/register-user">Sign Up</Link>,
            key: "signup",
            icon: <UserAddOutlined />,
          },
        ]
      : [
          {
            label: <span onClick={handleLogout}>Log Out</span>,
            key: "logout",
            icon: <UserAddOutlined />,
          },
        ]),
    ...(isAuthenticated === true
      ? [
          {
            label: <span>Welcome{account.username}</span>,
            key: "account",
            icon: <UserAddOutlined />,
          },
        ]
      : []),
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
