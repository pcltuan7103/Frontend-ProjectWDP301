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

const SideBarAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(doLogout());
        navigate("/");
    };

    const items = [
        {
            key: "sub1",
            label: "List Jobs",
            icon: <MailOutlined />,
            children: [
                {
                    key: "1",
                    label: <Link to="/admin/list-no-public-job">List Unaccepted Jobs</Link>,
                },
                {
                    key: "2",
                    label: <Link to="/admin/list-public-job">List Accepted Jobs</Link>,
                },
            ],
        },
        {
            type: "divider",
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
export default SideBarAdmin;
