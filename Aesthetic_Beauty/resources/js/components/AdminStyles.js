import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
//import CreateStyles  from './CreateStyles';

export default function AdminStyles() {

    const [Styles, setStyles] = useState([])
    const [Services, getServices] = useState([])

    //Iniciar funciones cuando el componente (página) carguen 
    useEffect(()=>{
        fetchStyles()
    },[])

    const fetchStyles = async () => {
        await axios.get(`/api/getAllStyles`).then(({data})=>{
            setStyles(data)
        })
    }
    

    const deleteStyle = async (id) => {
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
          
          await axios.delete(`http://localhost:8000/api/styles/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchStyles()
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
                <Link className='btn btn-primary mb-2 float-end' to={"/AdminPanel/styles/create"}>
                    Create style
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Style name</th>
                                    <th>Cost</th>
                                    <th>Image</th>
                                    <th>Genre</th>
                                    <th>Related service</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Styles.length > 0 && (
                                        //map es para escanear todos
                                        //los datos obtenidos
                                        //del URL del API
                                        Styles.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.cost}</td>
                                                <td>
                                                    <img width="50px" src={`./storage/style/image/${row.url}`} />
                                                </td>
                                                <td>{row.genre}</td>
                                                <td>{row.id_service} = {row.sname}</td>
                                                <td>
                                                    <Link to={`/AdminPanel/styles/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteStyle(row.id)}>
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