import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css"

function AdminSidebar() {
    return (


        <div className="sidebar">
            <NavLink to="/admin" className="nav-link text-white" activeClassName="active"><h3>Dashboard</h3></NavLink>
            <ul>
                <li ><NavLink to="/admin" className="nav-link text-white" style={{ marginLeft: "90px" }} activeClassName="active">Home</NavLink>
                </li>
                <li><NavLink to="/user" className="nav-link text-white" activeClassName="active">User Data</NavLink></li>
                <li><NavLink to="/property" className="nav-link text-white" activeClassName="active" id="prop">Property Data</NavLink></li>
                <li style={{ marginLeft: "-10px" }}><NavLink to="/images" className="nav-link text-white" activeClassName="active" id="prop">Property Images</NavLink></li>
                <li style={{ marginTop: "26rem" }}><NavLink to="/login" className="nav-link text-white" activeClassName="active">LogOut</NavLink></li>
            </ul>
        </div>





    );
}

export default AdminSidebar;
