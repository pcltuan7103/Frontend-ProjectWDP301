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
  UnorderedListOutlined,
  FileDoneOutlined,
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

  const logo = `/images/JobLink.png`;

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
      label: <Link to="/">
        <img src={logo} alt="JobLink" style={{ height: '30px' }} />
      </Link>,
      key: "home",
      // icon: <HomeOutlined />,
    },
    {
      label: <Link to="/recruitments">Recruitments</Link>,
      // key: "recruitments",
      icon: <SolutionOutlined />,
    },
    isAuthenticated
      ? {
        label: <Link to="/cv_profile">Profile & CV</Link>,
        key: "profile&cv",
        icon: <ContainerOutlined />,
      }
      : {
        label: <Link to="/login-user">Profile & CV</Link>,
        key: "login-user",
        icon: <ContainerOutlined />,
      },
    {
      label: <Link to="/">Companies</Link>,
      key: "companies",
      icon: <ApartmentOutlined />,
    },
    {
      label: <Link to="/">Tools</Link>,
      key: "tools",
      icon: <ToolOutlined />,
    },
    {
      label: <Link to="/">Resources</Link>,
      key: "resources",
      icon: <FileTextOutlined />,
    },
  ];

  const itemsRight = [
    ...(isAuthenticated === false
      ? [
        {
          label: <Link to="/login-user">Sign In</Link>,
          key: "signin",
          icon: <LoginOutlined />,
        },
        {
          label: <Link to="/register-user">Sign Up</Link>,
          key: "signup",
          icon: <UserAddOutlined />,
        },
        {
          label: <Link to="/recruitment-consulting">Recruitment Consulting</Link>,
          key: "recruitment-consulting",
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
                <Link to={`/applied-recruitments`}>
                  Đơn đã ứng tuyển
                </Link>
              ),
              key: 'applied-recruitments',
              icon: <FileDoneOutlined />
            },
            {
              label: (
                <Link to={`/favorite`}>
                  Tin tuyển dụng yêu thích
                </Link>
              ),
              key: 'favorite',
              icon: <UnorderedListOutlined />
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
