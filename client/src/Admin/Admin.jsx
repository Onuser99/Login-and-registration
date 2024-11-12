import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminSidebar from "./components/AdminSidebar"
function Admin() {
    const getAllUsersData = async () => {

        try {
            const response = await fetch("http://localhost:5001/api/admin/users", {
                method: "GET",

            });

            const data = await response.json();
            console.log(`users ${data}`)

        }

        catch (error) {
            console.log(error)
        }

    }
    return (
        <>


            <div style={{ width: "1310px", marginTop: "-269px" }}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary " style={{ boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                    <div className="container-fluid">

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <li to={"/image"}> <a className="nav-link active" aria-current="page" href="#">Image</a></li>
                                </li>
                                <li className="nav-item">
                                    <li to={"/details"}><a className="nav-link" href="#">Details</a></li>
                                </li>
                            </ul>
                        </div>

                        <div className="nav-item d-flex" role="search">
                            <li to={"/admin"} style={{ listStyleType: "none" }}><a className="navbar-brand" href="#">Admin</a></li>

                        </div>

                    </div>
                </nav >

            </div>


            <div className="container-fluid" >
                <div className="row">
                    <div className="col-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-9" style={{ marginTop: "210px" }}>
                        <div className="p-4">
                            <h1>Welcome</h1>
                            <p>Welcome, Administrator! Your gateway to efficient management and seamless operations. Dive in and take command with confidence.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Admin;