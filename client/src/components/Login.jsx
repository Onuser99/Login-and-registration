import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/auth";

function Login() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const storeTokenInLS = userAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;


        setFormData({
            ...formData,
            [name]: value,

        });
    };

    const handleSubmit = async (e) => {
        console.log("hello");

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            if (response.status >= 200 && response.status < 300) {
                setFormData({
                    email: "",
                    password: ""
                });
                alert("Login Successful");
                navigate("/home");
            }
            else {
                alert("Invalid Email or Password");
                console.log("Invalid credentials");

            }

            console.log("result", response);
            storeTokenInLS(response.token);

        }
        catch (error) {
            console.log(error)
        }
    }

    return (<>

        <div className="main">
            <div className="container">
                <h3 className="text-center mb-4">Login Form</h3>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email"><i class="fa-solid fa-user"></i> Username</label>
                        <input
                        
                        
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                            placeholder="Enter your email"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="password"><i class="fa-solid fa-lock"></i> Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary bg-dark btn-block">
                        Login
                    </button>
<div className="inline">
<input type="checkbox"></input><label> Remember Me</label>
                    </div>

                </form>
 
 
                <p className="text-center mb-4 mt-2" >Don't have an account</p>

                <Link to="/register" className="btn btn-default btn-block border w-100 bg-light rounded-0  text-decoration-none">
                    Register
                </Link>


            </div>
        </div>
    </>)
}
export default Login;