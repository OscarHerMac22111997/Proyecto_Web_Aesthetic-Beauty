import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import CreateServices  from './CreateServices';

export default function AdminServices() {

    const [Services, setServices] = useState([])

    useEffect(()=>{
        fetchServices() 
    },[])

    const fetchServices = async () => {
        await axios.get(`http://localhost:8000/api/services`).then(({data})=>{
            setServices(data)
        })
    }

    const deleteProduct = async (id) => {
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
          await axios.delete(`http://localhost:8000/api/services/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchServices()
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
                <Link className='btn btn-primary mb-2 float-end' to={"/AdminPanel/services/create"}>
                    Create Service
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Services.length > 0 && (
                                        Services.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="50px" src={`./storage/service/image/${row.url}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/AdminPanel/services/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
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