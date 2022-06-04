import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';


export default function AdminStylists() {

    const [Stylists, setStylists] = useState ([]);
    useEffect(()=>{
        fetchStylists()
    },[])

    const fetchStylists = async () => {
        await axios.get(`/api/getAllStylists`).then(({data})=>{
            setStylists(data)
        })
    }
    

    const deleteStylists = async (id) => {
        const confirmar = await Swal.fire({
            title: 'Are you sure?',
            text: "You are trying to delete this permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.value;
          });
          console.log(confirmar);
          if(!confirmar){
            return;
          }
          console.log("pasará?");
          await axios.delete(`http://localhost:8000/api/users/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchStylists()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/AdminPanel/stylists/create"}>
                    Add a new employee
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th>Phone number</th>
                                    <th>E-mail</th>
                                    <th>Photo</th>
                                    <th>Actual Shop</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Stylists.length > 0 && (
                                        Stylists.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.genre}</td>
                                                <td>{row.phone}</td>
                                                <td>{row.email}</td>
                                                <td>
                                                    <img width="50px" src={`./storage/stylist/image/${row.url}`} />
                                                </td>
                                                <td>{row.shopname}</td>
                                                <td>
                                                    <Link to={`/AdminPanel/stylists/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Statics and Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteStylists(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}