import React, { useState } from "react";
import {
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  FileAddOutlined,
  SettingOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import "./Header.scss"; // Import the CSS file for styling

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

  const itemsLeft = [
    {
      label: <Link to="/">Home Page</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
  ];

  const itemsRight = [
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
          {
            label: <Link to="/homepostjob">Post Job and Recruit Resumes</Link>,
            key: "employer",
            icon: <FileAddOutlined />,
          },
        ]
      : [
          {
            label: <span>Setting</span>,
            key: "setting",
            icon: <SettingOutlined />,
            children: [
              {
                label: <span onClick={handleLogout}>Log Out</span>,
                key: "logout",
                icon: <LogoutOutlined />,
              },
              {
                label: (
                  <Link to={`/profile/${account.id}`}>
                    Welcome {account.username}
                  </Link>
                ),
                key: "account",
                icon: <UserOutlined />,
              },
            ],
          },
        ]),
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

export default Header;
