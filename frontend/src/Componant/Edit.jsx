import React, { useState, useEffect } from 'react'
import { useParams, useNavigate  } from 'react-router-dom';

function Edit() {

  // take id from url
  const { id } = useParams('');
  console.log(id);

  // const [getUser, setGetUser] = useState([]);
  // console.log(getUser);

  // useNavigate  use for redirect page
  const navigate = useNavigate ();

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
      setIval(data);

    } catch (error) {
      console.error('Fetch Error:', error.message);
      alert('Error fetching data: ' + error.message);
    }
  };


  useEffect(() => {
    getData();
    // alert('Welcome ' + ival.name)
  }, [])

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, address, desc, } = ival;

    try {
      const res2 = await fetch(`http://localhost:3000/api/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({
          name,
          email,
          age,
          mobile,
          work,
          address,
          desc,
        }),
      });

      if (!res2.ok) {
        throw new Error(`Error: ${res2.status} ${res2.statusText}`);
      }

      const data2 = await res2.json();
      console.log(data2);
      navigate('/');

    } catch (error) {
      console.error('Fetch Error:', error.message);
      alert('Error fetching data: ' + error.message);
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
            <button onClick={updateUser} className='btn btn-outline-primary my-4 w-25'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit