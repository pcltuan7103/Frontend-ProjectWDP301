import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./LoginUser.scss";
import { loginUser } from "../../Api/api";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginUser(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      dispatch(doLogin(res));
      notification.success({
        message: "LOGIN USER",
        description: "SUCCESS",
      });
      if (res && res.user.role.name === "user") {
        navigate("/");
      }
      if (res && res.user.role.name === "admin") {
        navigate("/admin");
      }
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res ? res.EM : "ERROR",
      });
    }
  };

  return (
    <div className="login-user-container">
      <Row justify={"center"} style={{ marginTop: "30px", width: "2700px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Log In</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Link to={"/"}>
              <ArrowLeftOutlined /> Back To Homepage
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Already have an account? <Link to={"/login-user"}>Sign Up</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default LoginUser;
