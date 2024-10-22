import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationByJob, acceptApplication, rejectApplication } from "../../../Api/api";
import { Button, Table, message } from "antd";
import "./ListApplication.scss";

const ListApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataApplication, setDataApplication] = useState([]);
    const [applicationStatus, setApplicationStatus] = useState({}); // Track application acceptance/rejection status

    useEffect(() => {
        fetchApplication();
        loadApplicationStatus(); // Load status from local storage
    }, []);

    const fetchApplication = async () => {
        try {
            const res = await getApplicationByJob(id);
            setDataApplication(res.applications);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const loadApplicationStatus = () => {
        const storedStatus = localStorage.getItem('applicationStatus');
        if (storedStatus) {
            setApplicationStatus(JSON.parse(storedStatus));
        }
    };

    const saveApplicationStatus = (status) => {
        localStorage.setItem('applicationStatus', JSON.stringify(status));
    };

    const handleDownloadCv = (cvBuffer, fileName) => {
        const blob = new Blob([new Uint8Array(cvBuffer)], {
            type: "application/pdf",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    const handleAccept = async (applicationId, userId) => {
        try {
            await acceptApplication(applicationId, { userId });
            const updatedStatus = { ...applicationStatus, [applicationId]: 'accepted' };
            setApplicationStatus(updatedStatus); // Update status
            saveApplicationStatus(updatedStatus); // Save to local storage
            message.success("Application accepted and notification sent.");
            fetchApplication(); // Refresh the application list
        } catch (error) {
            console.error("Error accepting application:", error);
            message.error("Failed to accept application.");
        }
    };

    const handleReject = async (applicationId, userId) => {
        try {
            await rejectApplication(applicationId, { userId });
            const updatedStatus = { ...applicationStatus, [applicationId]: 'rejected' };
            setApplicationStatus(updatedStatus); // Update status
            saveApplicationStatus(updatedStatus); // Save to local storage
            message.success("Application rejected and notification sent.");
            fetchApplication(); // Refresh the application list
        } catch (error) {
            console.error("Error rejecting application:", error);
            message.error("Failed to reject application.");
        }
    };

    const columns = [
        {
            title: "Application ID",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Job ID",
            dataIndex: "jobId",
            key: "jobId",
        },
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "CV File Name",
            dataIndex: "cv",
            key: "cv",
            render: (text, record) => {
                const fileName = `CV_${record._id}.pdf`;
                return (
                    <Button type="link" onClick={() => handleDownloadCv(record.cv.data, fileName)}>
                        {fileName}
                    </Button>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div>
                    {applicationStatus[record._id] ? (
                        <span>{applicationStatus[record._id]}</span> // Show status (accepted/rejected)
                    ) : (
                        <>
                            <Button type="primary" onClick={() => handleAccept(record._id, record.userId)}>Accept</Button>
                            <Button type="danger" onClick={() => handleReject(record._id, record.userId)}>Reject</Button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    const data = dataApplication.map((application) => ({
        key: application._id,
        jobId: application.jobId,
        _id: application._id,
        cv: application.cv,
        userId: application.userId,
    }));

    return (
        <div className="list-applications">
            <div className="back" onClick={() => navigate("/postjob/list-jobs")}>
                Back
            </div>
            <div className="title">List of Applications</div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ListApplication;
