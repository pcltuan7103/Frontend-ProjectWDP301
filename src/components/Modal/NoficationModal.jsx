// components/NotificationModal.js

import React from 'react';
import { Modal, List } from 'antd';

const NotificationModal = ({ open, onClose, notifications }) => {
    return (
        <Modal
            title="Notifications"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <List
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.message}
                            description={new Date(item.createdAt).toLocaleString()}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default NotificationModal;
