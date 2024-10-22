import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationByJob } from "../../../Api/api";
import { Button, Table } from "antd";
import "./ListApplication.scss";

const ListApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataApplication, setDataApplication] = useState([]);

    useEffect(() => {
        fetchApplication();
    }, []);

    console.log(dataApplication);

    const fetchApplication = async () => {
        const res = await getApplicationByJob(id);
        setDataApplication(res.applications);
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

    const columns = [
        {
            title: "Application ID",
            dataIndex: "_id", // Field to show application ID
            key: "_id",
        },
        {
            title: "Job ID",
            dataIndex: "jobId", // Field to show job ID
            key: "jobId",
        },
        {
            title: "User ID",
            dataIndex: "userId", // Field to show job ID
            key: "userId",
        },
        {
            title: "CV File Name",
            dataIndex: "cv", // Field to show the CV file name
            key: "cv",
            render: (text, record) => {
                const fileName = `CV_${record._id}.pdf`; // Generating a file name
                return (
                    <Button
                        type="link"
                        onClick={() =>
                            handleDownloadCv(record.cv.data, fileName)
                        }
                    >
                        {fileName}
                    </Button>
                );
            },
        },
    ];

    // Map application data to the dataSource format for the table
    const data = dataApplication.map((application) => ({
        key: application._id, // Unique key for each application
        jobId: application.jobId, // Job ID
        _id: application._id, // Application ID
        cv: application.cv, // CV Buffer
        userId: application.userId, 
    }));

    return (
        <div className="list-applications">
            <div
                className="back"
                onClick={() => navigate("/postjob/list-jobs")}
            >
                Back
            </div>
            <div className="title">List of Applications</div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ListApplication;
