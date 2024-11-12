import { useEffect, useState } from "react";
import AdminSidebar from "../Admin/components/AdminSidebar";

export const UserData = () => {
    const [users, setUsers] = useState([]);
    const getAllUsersData = async () => {

        try {
            const response = await fetch("http://localhost:5001/api/admin/users", {
                method: "GET",

            });

            const data = await response.json();
            console.log(`users ${data}`)
            setUsers(data);
        }

        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllUsersData();
    }, []
    )
    return (<>



        <div style={{ width: "1310px" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary " style={{ boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <div className="container-fluid">

                

                    <div className="nav-item d-flex" role="search">
                        <li to={"/admin"} style={{ listStyleType: "none" }}><a className="navbar-brand" href="#">Admin</a></li>

                    </div>

                </div>
            </nav >

        </div>

        <AdminSidebar />

        <div className="main-content" style={{ marginLeft: "15rem", marginTop: "2rem" }}>
            <h4 style={{ textAlign: "center" }}>Users Data</h4><br></br>

            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((curUser, index) => (
                            <tr key={index}>
                                <td>{curUser.name}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    </>)


}

