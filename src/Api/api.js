import axios from "./axios.customize";

const registerUser = async (email, password, username) => {
    const URL_API = "/v1/api/send-otp-user";
    const data = { email, password, username };

    try {
        return await axios.post(URL_API, data);
    } catch (error) {
        console.error('Error in registerUser:', error);
        throw error; // Re-throw to handle in the calling function
    }
};

const verifyOtpUser = async (email, otp, password, username) => {
    const URL_API = "/v1/api/verify-otp-user";
    const data = { email, otp, password, username };

    try {
        return await axios.post(URL_API, data);
    } catch (error) {
        console.error('Error in verifyOtpUser:', error);
        throw error; // Re-throw to handle in the calling function
    }
};

const registerEmployer = async (email, password, username) => {
    const URL_API = "/v1/api/send-otp-employer";
    const data = { email, password, username };

    try {
        return await axios.post(URL_API, data);
    } catch (error) {
        console.error('Error in registerEmployer:', error);
        throw error; // Re-throw to handle in the calling function
    }
};

const verifyOtpEmployer = async (email, otp, password, username) => {
    const URL_API = "/v1/api/verify-otp-employer";
    const data = { email, otp, password, username };

    try {
        return await axios.post(URL_API, data);
    } catch (error) {
        console.error('Error in verifyOtpEmployer:', error);
        throw error; // Re-throw to handle in the calling function
    }
};

const loginUser = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = { email, password };
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
    const URL_API = "job/create";
    return axios.post(URL_API, jobData);
};

const getJobByEmployerId = (employerId) => {
    const URL_API = `/jobs/employer/${employerId}`;
    return axios.get(URL_API);
};

const getUnacceptedJob = () => {
    const URL_API = "jobs/no-public";
    return axios.get(URL_API);
};

const getAcceptedJob = () => {
    const URL_API = "jobs/public";
    return axios.get(URL_API);
};

const acceptJob = (jobId) => {
    const URL_API = `accept-job/${jobId}`;
    return axios.put(URL_API);
};

const getJobById = (jobId) => {
    const URL_API = `job/${jobId}`;
    return axios.get(URL_API);
};

const updateJob = (jobId, values) => {
    const URL_API = `job/${jobId}`;
    return axios.put(URL_API, values);
};

const deleteJob = (jobId) => {
    const URL_API = `Job/${jobId}`;
    return axios.delete(URL_API);
};

const getApplicationByJob = (jobId) => {
    const URL_API = `/applications/job/${jobId}`;
    return axios.get(URL_API);
};

const acceptApplication = async (applicationId, data) => {
    return await axios.post(`/application/${applicationId}/accept`, data);
};

const rejectApplication = async (applicationId, data) => {
    return await axios.post(`/application/${applicationId}/reject`, data);
};

const getNoficationByUser = (userId) => {
    const URL_API = `/v1/api/users/nofication/${userId}`;
    return axios.get(URL_API);
};

const updateNotificationStatus = (userId) => {
    const URL_API = `/v1/api/users/read/${userId}`;
    return axios.post(URL_API);
};

export {
    registerUser,
    registerEmployer,
    verifyOtpUser,
    verifyOtpEmployer,
    loginUser,
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
    getApplicationByJob,
    acceptApplication,
    rejectApplication,
    getNoficationByUser,
    updateNotificationStatus,
};
