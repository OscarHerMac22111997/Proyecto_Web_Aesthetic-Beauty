import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminColors() {

    const [Colors, setColors] = useState([])

    useEffect(()=>{
        fetchColors()
    },[])

    const fetchColors = async () => {
        await axios.get(`/api/getAllColors`).then(({data})=>{
            setColors(data)
        })
    }
    

    const deleteColor = async (id) => {
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
          await axios.delete(`http://localhost:8000/api/colors/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchColors()
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
                <Link className='btn btn-primary mb-2 float-end' to={"/AdminPanel/colors/create"}>
                    Match new color
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Color name</th>
                                    <th>Sample</th>
                                    <th>Related Style</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Colors.length > 0 && (
                                        Colors.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>
                                                    <img width="50px" src={`./storage/color/image/${row.url}`} />
                                                </td>
                                                <td>{row.id_style} = {row.sname}</td>
                                                <td>
                                                    <Link to={`/AdminPanel/colors/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteColor(row.id)}>
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