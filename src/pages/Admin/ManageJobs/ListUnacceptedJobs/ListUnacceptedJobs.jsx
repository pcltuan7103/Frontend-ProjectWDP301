import React, { useEffect, useState } from "react";
import { acceptJob, getUnacceptedJob } from "../../../../Api/api";
import { Table, Button, message } from "antd"; // Import Button and message

const ListUnacceptedJobs = () => {
    const [dataJob, setDataJob] = useState([]);

    useEffect(() => {
        fetchJob(); // Fixed typo from fectchJob to fetchJob
    }, []);

    const fetchJob = async () => {
        const res = await getUnacceptedJob();
        setDataJob(res.jobs);
    };

    // Handle reject job
    const handleReject = (jobId) => {
        // Implement your reject logic here
        message.error(`Job ${jobId} rejected!`);
        // Optionally refresh the job list
        fetchJob();
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Detailed Location",
            dataIndex: "detailed_location",
            key: "detailed_location",
        },
        {
            title: "Is Public",
            dataIndex: "isPublic",
            key: "isPublic",
            render: (isPublic) => (isPublic ? "Public" : "Private"),
        },
        {
            title: "Due Date",
            dataIndex: "due_to",
            key: "due_to",
            render: (due_to) => new Date(due_to).toLocaleDateString(),
        },
        {
            title: "Actions", // New column for actions
            key: "action",
            render: (text, record) => ( // 'text' is the text of the cell, 'record' is the entire row data
                <>
                    <Button type="primary" onClick={() => handleAccept(record.key)}>
                        Accept
                    </Button>
                    <Button type="danger" onClick={() => handleReject(record.key)} style={{ marginLeft: 8 }}>
                        Reject
                    </Button>
                </>
            ),
        },
    ];

    // Map job data to the dataSource format for the table
    const data = dataJob.map((job) => ({
        key: job._id, // Unique key for each job
        title: job.title,
        description: job.description,
        detailed_location: job.detailed_location,
        isPublic: job.isPublic,
        due_to: job.due_to,
    }));

    const handleAccept = async (jobId) => {
      try {
          await acceptJob(jobId); // Call the API to accept the job
          message.success(`Job ${jobId} accepted!`);
          fetchJob(); // Refresh the job list
      } catch (error) {
          message.error(`Error accepting job: ${error.message}`);
      }
  };

    return (
        <div className="list-jobs-company">
            <div className="title">List Jobs</div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ListUnacceptedJobs;
