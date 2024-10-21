import React, { useEffect, useState, useRef } from 'react';
import './TopCompany.scss';

const TopCompany = () => {
    const [companies, setCompanies] = useState([]);
    const sliderRef = useRef(null);
    const cardsToShow = 3; // Số lượng card muốn hiển thị mỗi lần

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:8080/top-companies');
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: sliderRef.current.clientWidth / cardsToShow, // Cuộn theo chiều rộng của 1 card
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -sliderRef.current.clientWidth / cardsToShow, // Cuộn ngược lại theo chiều rộng của 1 card
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="top-companies">
            <h2>Công ty hàng đầu</h2>
            <div className="slider-container">
                <button className="slider-button prev" onClick={handlePrev}>❮</button>
                <div className="slider" ref={sliderRef}>
                    {companies.map((company) => (
                        <div key={company.companyId} className="company-card">
                            <img src={company.logo} alt={company.name} />
                            <h3>{company.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="slider-button next" onClick={handleNext}>❯</button>
            </div>
        </div>
    );
};

export default TopCompany;
