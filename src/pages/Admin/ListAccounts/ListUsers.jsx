import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "../../../Api/api";

const ListUsers = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getAllUsers();
            setDataUsers(res.map(user => ({ ...user, key: user._id }))); // Ensure each user has a unique key
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchUser = async (userId) => {
        try {
            const res = await getUserById(userId);
            setDataUser(res);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setDataUser(null);
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Actions",
            key: "action",
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => fetchUser(record._id)}> {/* Use _id here */}
                        View
                    </Button>
                    <Button type="warning" onClick={() => {}}>
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <div
                className="list-accounts"
                style={{ width: "100%", padding: "30px" }}
            >
                <div
                    className="title"
                    style={{
                        fontSize: "30px",
                        fontWeight: "700",
                        marginBottom: "50px",
                    }}
                >
                    List Users
                </div>
                <Table columns={columns} dataSource={dataUsers} />
            </div>

            <Modal
                title="User Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Close
                    </Button>,
                ]}
            >
                {dataUser && (
                    <div>
                        <p><strong>Email:</strong> {dataUser.email}</p>
                        <p><strong>Username:</strong> {dataUser.username}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ListUsers;
