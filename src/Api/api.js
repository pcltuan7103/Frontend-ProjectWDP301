import axios from "./axios.customize";

const registerUser = (email, password, username) => {
    const URL_API = "/v1/api/register-user";
    const data = { email, password, username };
    return axios.post(URL_API, data);
};

const loginUser = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = { email, password };
    return axios.post(URL_API, data);
};

const registerEmployer = (email, password, username) => {
    const URL_API = "/v1/api/register-employer";
    const data = { email, password, username };
    return axios.post(URL_API, data);
};

const updateUser = (userId, data) => {
    const URL_API = `/v1/api/users/update/${userId}`; // Replace with actual API endpoint
    return axios.put(URL_API, data); // PUT request to update the user
};

const getCompany = (userId) => {
    const URL_API = `company/get/${userId}`;
    return axios.get(URL_API);
};

const createCompany = (companyData) => {
    const URL_API = `company/create/`;
    return axios.post(URL_API, companyData);
};

const createJob = (jobData) => {
    const URL_API = "job/create"
    return axios.post(URL_API, jobData)
}

const getJobByEmployerId = (employerId) => {
    const URL_API = `/jobs/employer/${employerId}`
    return axios.get(URL_API) 
}

const getUnacceptedJob = () => {
    const URL_API = "jobs/no-public"
    return axios.get(URL_API)
}

const getAcceptedJob = () => {
    const URL_API = "jobs/public"
    return axios.get(URL_API)
}

const acceptJob = (jobId) => {
    const URL_API = `accept-job/${jobId}`
    return axios.put(URL_API)
}

const getJobById = (jobId) => {
    const URL_API = `job/${jobId}`
    return axios.get(URL_API)
}

const updateJob = (jobId, values) => {
    const URL_API = `job/${jobId}`
    return axios.put(URL_API, values)
}

const deleteJob = (jobId) => {
    const URL_API = `Job/${jobId}`
    return axios.delete(URL_API)
}

const getApplicationByJob = (jobId) => {
    const URL_API = `/applications/job/${jobId}`
    return axios.get(URL_API)
}

export {
    registerUser,
    loginUser,
    registerEmployer,
    updateUser,
    getCompany,
    createCompany,
    createJob,
    getJobByEmployerId,
    getUnacceptedJob,
    acceptJob,
    getAcceptedJob,
    getJobById,
    updateJob,
    deleteJob,
    getApplicationByJob
};
