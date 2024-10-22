import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TopCompany.scss';

const TopCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [careers, setCareer] = useState([]);
    const companySliderRef = useRef(null);
    const careerSliderRef = useRef(null);
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

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profession');
                setCareer(response.data);
                console.log('Fetch profession:', response.data);
            } catch (error) {
                console.error('Error fetching profession options', error);
            }
        };

        fetchCareers();
    }, []);

    const handleNext = (sliderRef) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: sliderRef.current.clientWidth / cardsToShow, // Cuộn theo chiều rộng của 1 card
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = (sliderRef) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -sliderRef.current.clientWidth / cardsToShow, // Cuộn ngược lại theo chiều rộng của 1 card
                behavior: 'smooth'
            });
        }
    };

    // Tự động chuyển slide sau mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(companySliderRef);  // Tự động chuyển slide cho company
            handleNext(careerSliderRef);   // Tự động chuyển slide cho career
        }, 5000); // Chuyển sau mỗi 5 giây

        return () => clearInterval(interval); // Clear interval khi component unmount
    }, []);

    return (
        <div className="top-companies">
            <h2>Công ty hàng đầu</h2>
            <div className="slider-container" id='company'>
                <button className="slider-button prev" onClick={() => handlePrev(companySliderRef)}>❮</button>
                <div className="slider" ref={companySliderRef}>
                    {companies.map((company) => (
                        <div key={company.companyId} className="card">
                            <img src={company.logo} alt={company.name} />
                            <h3>{company.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="slider-button next" onClick={() => handleNext(companySliderRef)}>❯</button>
            </div>

            <h2>Top ngành nghề nổi bật</h2>
            <div className="slider-container">
                <button className="slider-button prev" onClick={() => handlePrev(careerSliderRef)}>❮</button>
                <div className="slider" ref={careerSliderRef}>
                    {careers.map((career) => (
                        <div key={career.careerId} className="card">
                            <h3>{career.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="slider-button next" onClick={() => handleNext(careerSliderRef)}>❯</button>
            </div>
        </div>
    );
};

export default TopCompany;
