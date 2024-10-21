import React, { useEffect, useState } from "react";
import { deleteJob, getJobByEmployerId } from "../../../Api/api";
import { useSelector } from "react-redux";
import { Button, message, Table } from "antd";
import "./ListJob.scss"
import { useNavigate } from "react-router-dom";

const ListJob = () => {
    const account = useSelector((state) => state.user.account);
    const [dataJob, setDataJob] = useState([]); // Ensure dataJob is an array
    const navigate = useNavigate()

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {
            const res = await getJobByEmployerId(account.id);
            setDataJob(res); // Assuming res is an array of job objects
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleViewDetail = (jobId) => {
        navigate(`/postjob/job-detail/${jobId}`)
    }

    const handleDelete = async (jobId) => {
        try{
            await deleteJob(jobId);
            message.success(`Delete Success`);
        } catch(error) {
            console.log(error)
        }
    }

    // Define the columns, including detailed_location and description
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',  // Job title
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',  // Job description
            key: 'description',
        },
        {
            title: 'Detailed Location',
            dataIndex: 'detailed_location',  // Detailed job location
            key: 'detailed_location',
        },
        {
            title: 'Is Public',
            dataIndex: 'isPublic',  // Job visibility status
            key: 'isPublic',
            render: (isPublic) => (isPublic ? 'Public' : 'Private'),  // Format boolean value
        },
        {
            title: 'Due Date',
            dataIndex: 'due_to',  // Job due date
            key: 'due_to',
            render: (due_to) => new Date(due_to).toLocaleDateString(), // Format the date
        },
        {
            title: "Actions", // New column for actions
            key: "action",
            render: (text, record) => ( // 'text' is the text of the cell, 'record' is the entire row data
                <>
                    <Button type="primary" onClick={() => handleViewDetail(record.key)}>
                        Edit
                    </Button>
                    <Button type="second" onClick={() => handleDelete(record.key)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    // Map job data to the dataSource format for the table
    const data = dataJob.map((job) => ({
        key: job._id, // Unique key for each job
        title: job.title, // Job title
        description: job.description, // Job description
        detailed_location: job.detailed_location, // Job detailed location
        isPublic: job.isPublic, // Public status
        due_to: job.due_to, // Due date
    }));

    return (
        <div className="list-jobs-company">
            <div className="title">List Jobs</div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ListJob;
