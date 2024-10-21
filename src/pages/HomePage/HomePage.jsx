import React from "react";
import { Result } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isAuthenticated = useSelector((state) => {
        return state.user.isAuthenticated;
    });
    const account = useSelector((state) => {
        return state.user.account;
    });
    if (account.role === "employer" || account.role === "admin") {
        return <div>You're not allowed to access this page</div>;
    }
    return (
        <div style={{ padding: "28px" }}>
            <Result icon={<CrownOutlined />} title="FullStack JS - JWT" />
        </div>
    );
};

export default HomePage;
