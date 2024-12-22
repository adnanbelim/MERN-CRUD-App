import React, { useContext, useState } from 'react'
import { alertDatafn } from './Context/contextProvider'
import { useNavigate } from 'react-router-dom';

function Register() {

  const {alertData, setAlertData} = useContext(alertDatafn);

  const navigate = useNavigate();

  const [ival, setIval] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    address: '',
    desc: '',
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setIval((preVal) => {
      return {
        ...preVal,
        [name]: value
      }
    })
  }

  const sendData = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, address, desc } = ival;

    // Frontend validation for empty fields
    if (!name || !email || !age || !mobile || !work || !address || !desc) {
      alert("Please fill out all fields before submitting.");
      return; // Stop execution if validation fails
    }

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          mobile,
          work,
          address,
          desc,
        }),
      });

      const data = await res.json(); // Parse JSON response

      if (res.ok) {
        setAlertData(data);
        // console.log(data);
        navigate('/');
      } else {
        alert('Error: ' + data);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error: ' + error.message);
    }
  };


  return (
    <div className='mt-5'>
      <div className="container">
        <div class="row">
          <div class="col col-md-6 col-sm-12">
            <input type="text" value={ival.name} onChange={setData} name='name' class="form-control mt-4" placeholder="Name" aria-label="Name" />
          </div>
          <div class="col col-md-6 col-sm-12">
            <input type="email" value={ival.email} onChange={setData} name='email' class="form-control mt-4" placeholder="Email" aria-label="Email" />
          </div>
        </div>
        <div class="row">
          <div class="col col-md-6 col-sm-12">
            <input type="number" value={ival.age} onChange={setData} name='age' class="form-control mt-4" placeholder="Age" aria-label="Age" />
          </div>
          <div class="col col-md-6 col-sm-12">
            <input type="number" value={ival.mobile} onChange={setData} name='mobile' class="form-control mt-4" placeholder="Mobile" aria-label="Mobile" />
          </div>
        </div>
        <div class="row">
          <div class="col col-md-6 col-sm-12">
            <input type="text" value={ival.work} onChange={setData} name='work' class="form-control mt-4" placeholder="Work" aria-label="Work" />
          </div>
          <div class="col col-md-6 col-sm-12">
            <input type="text" value={ival.address} onChange={setData} name='address' class="form-control mt-4" placeholder="Address" aria-label="Address" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <textarea type="text" value={ival.desc} onChange={setData} name='desc' class="form-control mt-4" rows='7' placeholder="Description" aria-label="Description" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={sendData} className='btn btn-outline-primary my-4 w-25'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register