import React, { useContext, useEffect, useState } from 'react'
import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import Register from './Register';
import { alertDatafn } from './Context/contextProvider'

function Dashboard() {

  // Initialize all tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  const [getUser, setGetUser] = useState([]);
  // console.log(getUser);

  const {alertData, setAlertData} = useContext(alertDatafn);

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getdata', {
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
      console.log(data);
    } catch (error) {
      console.error('Fetch Error:', error.message);
      alert('Error fetching data: ' + error.message);
    }
  };


  useEffect(() => {
    getData();
  }, []);

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
    } catch (error) {
      console.error('Fetch Error:', error.message);
      alert('Error fetching deleteData: ' + error.message);
    }
  };



  return (

    <>
    {
        alertData ? 
        <>
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
              <strong>Success</strong>User added successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
         : ''
    }

      <div className='mt-5'>
        <div className="container">
          <div className="add_btn mt-2 text-end">
            <Link to='/register' className='text-decoration-none'>
              <button className="btn btn-outline-primary">
                Add Data
              </button>
            </Link>
          </div>

          <table className="table mt-3">
            <thead>
              <tr className='table-primary'>
                <th scope="col">#</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">job</th>
                <th scope="col">number</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {
                getUser.map((ele, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id}</th>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.work}</td>
                        <td>{ele.mobile}</td>
                        <td className='d-flex justify-content-around'>

                          <Link to='/register'>
                            <button className="btn btn-primary">
                              <i class="bi bi-plus" data-bs-toggle="tooltip" data-bs-placement="top" title="create"></i>
                            </button>
                          </Link>
                          <Link to={`/view/${ele._id}`}>
                            <button className="btn btn-success">
                              <i class="bi bi-eye" data-bs-toggle="tooltip" data-bs-placement="top" title="read"></i>
                            </button>
                          </Link>
                          <Link to={`/edit/${ele._id}`}>
                            <button className="btn btn-warning">
                              <i class="bi bi-pencil" data-bs-toggle="tooltip" data-bs-placement="top" title="update"></i>
                            </button>
                          </Link>

                          <button className="btn btn-danger" onClick={() => deleteUser(ele._id)}>
                            <i class="bi bi-trash" data-bs-toggle="tooltip" data-bs-placement="top" title="delete"></i>
                          </button>

                        </td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard;