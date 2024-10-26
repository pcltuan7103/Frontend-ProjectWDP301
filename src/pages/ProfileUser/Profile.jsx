import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Form, Input, message, notification, Row } from "antd";
import { updateUserSuccess } from "../../redux/action/userAction";
import { updateUser } from "../../Api/api"; // Ensure this path is correct

const Profile = () => {
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch(); // To update the Redux store after updating the username

    const onFinish = async (values) => {
        console.log("Form submitted:", values);
        try {
            const updateData = {
                username: values.username, // Extract the updated username
            };

            // Call the updateUser API
            const res = await updateUser(account.id, updateData);

            console.log(res);
            // Dispatch action to update the Redux store with the new username
            dispatch(updateUserSuccess(res.username)); // Adjust this based on your API response

            // Show a success notification
            notification.success({
                message: "Update User",
                description: "User updated successfully.",
            });
        } catch (error) {
            console.error("Update failed", error);
            message.error("Failed to update user");
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <Row
                        justify={"center"}
                        style={{ paddingTop: "200px" }}
                    >
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
                                    name="profileForm"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout="vertical"
                                    initialValues={{
                                        email: account.email, // Pre-fill email
                                        username: account.username, // Pre-fill username
                                    }}
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your email!",
                                            },
                                        ]}
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your username!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Update
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </fieldset>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>No user found.</div>
            )}
        </div>
    );
};

export default Profile;
