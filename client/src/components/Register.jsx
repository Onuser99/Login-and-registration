import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";
import { userAuth } from "../store/auth";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        DOB: "",
        email: "",
        password: "",
    });

    const storeTokenInLS = userAuth();

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello");

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5001/api/auth/register', formData);

                if (response.status >= 200 && response.status < 300) {
                    setFormData({
                        name: "",
                        DOB:"",
                        email: "",
                        password: ""
                    });
                    setErrors({});
                    navigate("/login");
                }

                if (response.status === 200) {
                    const res_data = response.data;
                    localStorage.setItem("token", res_data.token);
                    storeTokenInLS(res_data.token);
                }
                console.log("result", response);
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.msg === "email already exist") {
                    alert("Email already exists");
                } else {
                    console.log("register", error);
                }
            }
        } else {
            console.log("Validation errors found");
            setErrors(validationErrors);
        }

    };



    const validateForm = (data) => {
        let errors = {};
        if (!data.name.trim()) {
            errors.name = "Name is required";
        } else if (!isValidName(data.name)) {
            errors.name = "Name should not contain numbers";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email format";
        }
        if (!data.address.trim()) {
            errors.address = "Address is required";
        }
        if (!data.mobile.trim()) {
            errors.mobile = "Mobile number is required";
        } else if (!isValidMobile(data.mobile)) {
            errors.mobile = "Invalid mobile number";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        return errors;
    };


    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidMobile = (mobile) => {
        const cleanMobile = mobile.replace(/\D/g, "");
        return cleanMobile.length === 10;
    };

    return (
        <div className="main">
            <div className="container">
                <h3 className="text-center mb-4">Registration Form</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="DOB">DOB:</label>
                        <input
                            type="DOB"
                            className="form-control"
                            id="DOB"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            placeholder="Enter your DOB"
                            required
                        />
                        {errors.DOB && <div className="text-danger">{errors.DOB}</div>}

                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}

                    </div>


                   


                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}

                    </div>


                    <button type="submit" className="btn btn-primary bg-dark btn-block">
                        Register
                    </button>
                </form>

                <p className="text-center mb-4 mt-2">Already have an account</p>

                <Link to="/login" className="btn btn-default btn-block border w-100 bg-light rounded-0 text-decoration-none">
                    LogIn
                </Link>
            </div>
        </div>
    );
}

export default Register;
