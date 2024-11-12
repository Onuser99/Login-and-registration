import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from "react-router-dom";

const Homepage = () => {
    const [property, setProperty] = useState({
        Propertyname: "",
        title: "",
        description: "",
        type: "",
        Category: "",
        subCategory: "",
        price: "",
        Selectprice: "k"
    });

    const [errors, setErrors] = useState({});

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setProperty({ ...property, Category: category, subCategory: getDefaultSubcategory(category) });
        setErrors({ ...errors, Category: "", subCategory: "" });
    };

    const handleSubCategoryChange = (e) => {
        setProperty({ ...property, subCategory: e.target.value });
        setErrors({ ...errors, subCategory: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(property);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5001/api/auth/home', property);
                console.log("response", response);

                if (response.status >= 200 && response.status < 300) {
                    setProperty({
                        Propertyname: "",
                        title: "",
                        description: "",
                        type: "",
                        Category: "",
                        subCategory: "",
                        price: "",
                        Selectprice: ""
                    });
                    setErrors({});
                }
                console.log("result", response);
            } catch (error) {
                console.log("Validation errors found");
                setErrors(validationErrors);
            }
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        let errors = {};

        if (!data.Propertyname.trim()) {
            errors.Propertyname = "Name is required";
        } else if (!isValidName(data.Propertyname)) {
            errors.Propertyname = "Name should only contain letters and spaces";
        }

        if (!data.title.trim()) {
            errors.title = "Title is required";
        } else if (!isValidTitle(data.title)) {
            errors.title = "Title should only contain letters and spaces";
        }

        if (!data.description.trim()) {
            errors.description = "Description is required";
        }

        if (!data.type.trim()) {
            errors.type = "Property Type is required";
        }

        if (!data.Category.trim()) {
            errors.Category = "Category is required";
        }

        if (!data.subCategory.trim() && property.Category !== '') {
            errors.subCategory = "Sub Category is required";
        }

        if (!data.price.trim()) {
            errors.price = "Price is required";
        }

        if (!data.Selectprice.trim()) {
            errors.Selectprice = "Price type is required";
        }

        return errors;
    };

    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name);
    };

    const isValidTitle = (title) => {
        const titleRegex = /^[A-Za-z\s]+$/;
        return titleRegex.test(title);
    };

    const getDefaultSubcategory = (category) => {
        switch (category) {
            case 'Residential':
                return 'Flat/Apartment';
            case 'Commercial':
                return 'Office';
            case 'Land':
                return 'Commercial Land Plot';
            default:
                return '';
        }
    };



    return (

        <>

            <div style={{ width: "1310px", marginTop: "4px", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                    <div className="container-fluid">
                        <NavLink to={"/home"}><a className="navbar-brand" href="#">Property</a></NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to={"/upload"}> <a className="nav-link active" aria-current="page" href="#">Image</a></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={"/details"}><a className="nav-link" href="#">Details</a></NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex" role="search">
                            <NavLink to={"/admin"}><a className="navbar-brand" href="#">Admin</a></NavLink>

                        </div>

                    </div>
                </nav >

            </div>





            <br></br><br></br>

            <div className="main">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h5>Property Description</h5>
                        <div className="form-group">
                            <label htmlFor="name">Property Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Propertyname"
                                name="Propertyname"
                                value={property.Propertyname}
                                onChange={handleChange}
                                placeholder="Enter Property Name"
                                required
                            />
                            {errors.Propertyname && <div className="text-danger">{errors.Propertyname}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Ad title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={property.title}
                                onChange={handleChange}
                                placeholder="Enter title"
                                required
                            />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={property.description}
                                onChange={handleChange}
                                placeholder="Enter Description"
                                required
                            />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Property Type</label>
                            <select
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                id="type"
                                name="type"
                                value={property.type}
                                onChange={handleChange}
                            >
                                <option value="Sale">Sale</option>
                                <option value="Rent">Rent</option>
                            </select>
                            {errors.type && <div className="text-danger">{errors.type}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Category">Select Category</label>
                            <select
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                id="Category"
                                name="Category"
                                value={property.Category}
                                onChange={handleCategoryChange}
                            >
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Land">Land</option>
                            </select>
                            {errors.Category && <div className="text-danger">{errors.Category}</div>}
                        </div>

                        {property.Category === 'Residential' && (
                            <div className="form-group">
                                <label htmlFor="subCategory">Select Subcategory</label>
                                <select
                                    className="form-select"
                                    id="subCategory"
                                    name="subCategory"
                                    value={property.subCategory}
                                    onChange={handleSubCategoryChange}
                                >
                                    <option value="Flat/Apartment">Flat/Apartment</option>
                                    <option value="Independent House/ Villa">Independent House/ Villa</option>
                                    <option value="Bungalow">Bungalow</option>
                                    <option value="Loft">Loft</option>
                                    <option value="Townhome">Townhome</option>
                                </select>
                                {errors.subCategory && <div className="text-danger">{errors.subCategory}</div>}
                            </div>
                        )}

                        {property.Category === 'Commercial' && (
                            <div className="form-group">
                                <label htmlFor="subCategory">Select Subcategory</label>
                                <select
                                    className="form-select"
                                    id="subCategory"
                                    name="subCategory"
                                    value={property.subCategory}
                                    onChange={handleSubCategoryChange}
                                >
                                    <option value="Office">Office</option>
                                    <option value="Storage">Storage</option>
                                    <option value="Industry">Industry</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.subCategory && <div className="text-danger">{errors.subCategory}</div>}
                            </div>
                        )}

                        {property.Category === 'Land' && (
                            <div className="form-group">
                                <label htmlFor="subCategory">Select Subcategory</label>
                                <select
                                    className="form-select"
                                    id="subCategory"
                                    name="subCategory"
                                    value={property.subCategory}
                                    onChange={handleSubCategoryChange}
                                >
                                    <option value="Commercial Land Plot">Commercial Land Plot</option>
                                    <option value="Residential Land Plot">Residential Land Plot</option>
                                    <option value="Agricultural Farm Land">Agricultural Farm Land</option>
                                    <option value="Industrial Lands/Plots">Industrial Lands/Plots</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.subCategory && <div className="text-danger">{errors.subCategory}</div>}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with dropdown button"
                                    name="price"
                                    id="price"
                                    value={property.price}
                                    onChange={handleChange}
                                />
                                <select
                                    className="form-select"
                                    id="Selectprice"
                                    name="Selectprice"
                                    value={property.Selectprice}
                                    onChange={handleChange}
                                >
                                    <option value="k">K</option>
                                    <option value="lakh">Lakh</option>
                                </select>
                            </div>
                            {errors.price && <div className="text-danger">{errors.price}</div>}
                            {errors.Selectprice && <div className="text-danger">{errors.Selectprice}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary bg-dark btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </>

    );
};

export default Homepage;
