import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createCompany, getCompany } from "../../Api/api";
import "./ManageCompany.scss";

const ManageCompany = () => {
    const account = useSelector((state) => state.user.account);
    const [dataCompany, setDataCompany] = useState({});
    const [logo, setLogo] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        number_of_employee: "",
        introduction: "",
        location: "",
        website: "",
        isPublic: false,
        employer: account.id,
    });

    const { name, number_of_employee, location, introduction, website } =
        formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append("name", formData.name);
        data.append("number_of_employee", formData.number_of_employee);
        data.append("location", formData.location);
        data.append("introduction", formData.introduction);
        data.append("isPublic", formData.isPublic);
        data.append("employer", formData.employer);
        if (logo) data.append("logo", logo);
    
        try {
            await createCompany(data);
        } catch (err) {
        }
      };

    useEffect(() => {
        fecthCompany();
    }, []);

    const fecthCompany = async () => {
        const res = await getCompany(account.id);
        setDataCompany(res);
    };

    if (dataCompany.message === "Company not found") {
        return (
            <div className="create-company-container">
                <div className="title">Create Company</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Staff Number</label>
                        <input
                            type="number"
                            name="number_of_employee"
                            value={number_of_employee}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Link Website</label>
                        <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            name="introduction"
                            value={introduction}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label>Logo URL</label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <button type="submit">Create Company</button>
                </form>
            </div>
        );
    }

    return (
        <div className="company-info-container">
            <div className="title">Company Information</div>
            <div className="form">
                <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={dataCompany.name}
                        disabled
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Description</label>
                    <textarea
                        type="text"
                        className="form-input"
                        value={dataCompany.introduction}
                        rows={3}
                        disabled
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-input"
                        value={dataCompany.location}
                        disabled
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Number of Employee</label>
                    <input
                        type="text"
                        className="form-input"
                        value={dataCompany.number_of_employee}
                        disabled
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">Link Website</label>
                    <input
                        type="text"
                        className="form-input"
                        value={dataCompany.website}
                        disabled
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageCompany;
