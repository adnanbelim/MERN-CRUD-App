import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
function Detailes() {

    // take id from url
    const { id } = useParams('');
    console.log(id);

    const [getUser, setGetUser] = useState([]);
    // console.log(getUser);


    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setGetUser(data);
        } catch (error) {
            console.error('Fetch Error:', error.message);
            alert('Error fetching data: ' + error.message);
        }
    };


    useEffect(() => {
        getData();  
        alert('Welcome ' + getUser.name)
    },[])

    const navigate = useNavigate();

    const deleteUser = async (id) => {
        try {
            const res2 = await fetch(`http://localhost:3000/api/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const deleteData = await res2.json();
            console.log(deleteData);
            console.log("User Deleted");

            // Refresh the user list after deletion
            getData();
            navigate('/')
        } catch (error) {
            console.error('Fetch Error:', error.message);
            alert('Error fetching deleteData: ' + error.message);
        }
    };

    return (
        <div className="mt-5">
            <div className="container d-flex justify-content-center">
                <div className="card mb-3">
                    <div className="row g-0 d-lg-flex d-xs-block">
                        <div className="col-md-4 col-xs-12">
                            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" className="img-fluid rounded-start" alt="Image not load" />
                        </div>
                        <div className="col-md-8 col-xs-12 p-4">
                            <div className="row">
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">
                                    <h5 className="card-text">{getUser.name}</h5>
                                </div>
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">
                                    <h6 className="card-title">Email</h6>
                                    <p className="card-text">{getUser.email}</p>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">

                                    <h6 className="card-title">Age</h6>
                                    <p className="card-text">{getUser.age}</p>
                                </div>
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">
                                    <h6 className="card-title">Mobile</h6>
                                    <p className="card-text">{getUser.mobile}</p>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">

                                    <h6 className="card-title">Work</h6>
                                    <p className="card-text">{getUser.work}</p>
                                </div>
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">
                                    <h6 className="card-title">Address</h6>
                                    <p className="card-text">{getUser.address}</p>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 mt-3 justify-content-between">

                                    <h6 className="card-title">Description</h6>
                                    <p className="card-text mt-1">{getUser.desc}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-xs-12 d-flex mt-3 justify-content-between">

                                    <Link to='/register'>
                                        <button className="btn btn-primary">
                                            <i class="bi bi-plus" data-bs-toggle="tooltip" data-bs-placement="top" title="create"></i>
                                        </button>
                                    </Link>
                                    <Link to='/view/:id'>
                                        <button className="btn btn-success">
                                            <i class="bi bi-eye" data-bs-toggle="tooltip" data-bs-placement="top" title="read"></i>
                                        </button>
                                    </Link>
                                    <Link to={`/edit/${getUser._id}`}>
                                        <button className="btn btn-warning">
                                            <i class="bi bi-pencil" data-bs-toggle="tooltip" data-bs-placement="top" title="update"></i>
                                        </button>
                                    </Link>
                                    <Link to='/delete'>
                                        <button className="btn btn-danger" onClick={() => deleteUser(getUser._id)}>
                                            <i class="bi bi-trash" data-bs-toggle="tooltip" data-bs-placement="top" title="delete"></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detailes