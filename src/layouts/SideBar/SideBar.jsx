import React from "react";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(doLogout());
        navigate("/homepostjob");
    };

    const items = [
        {
            key: "sub1",
            label: "Manage Jobs",
            icon: <MailOutlined />,
            children: [
                {
                    key: "1",
                    label: <Link to="list-jobs">List Jobs</Link>,
                },
                {
                    key: "2",
                    label: <Link to="add-job">Add Job</Link>,
                },
            ],
        },
        {
            type: "divider",
        },
        {
            key: "sub2",
            label: <Link to="/postjob/manage-company">Manage Company</Link>,
            icon: <AppstoreOutlined />,
        },
        {
            label: <span onClick={handleLogout}>Log out</span>,
            key: "logout",
        },
    ];

    return (
        <Menu
            style={{
                width: 256,
                minHeight: "100vh",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
        />
    );
};
export default SideBar;
