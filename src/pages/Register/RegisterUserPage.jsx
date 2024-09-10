import React from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./RegisterUser.scss";
import { registerUser } from "../../Api/api";

const RegisterUser = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password, username } = values;

    const res = await registerUser(email, password, username);

    if (res) {
      notification.success({
        message: "SIGN UP USER",
        description: "SUCCESS",
      });
      navigate("/login-user");
    } else {
      notification.error({
        message: "SIGN UP USER",
        description: "ERROR",
      });
    }
  };

  return (
    <div className="register-user-container">
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
            <legend>Sign Up</legend>
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

              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
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
              Already have an account? <Link to={"/login-user"}>Log In</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterUser;
