import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";
import Form from 'react-bootstrap/Form'

export default function AdminDates() {
    const navigate = useNavigate();
    const [Dates, setDates] = useState ([]);
    const [id_user, setId] = useState();
    const [opinion, setOpinion] =useState('');
    const [rate, setRate] =useState();
    const [iddate, setIdDate] =useState();
    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const id  = data.user[0];
            setId(id);
            axios.get('/api/getMydates/'+ data.user[0].id).then(({data})=>{
                setDates(data.dates)
            })
        })
    }


    useEffect(()=>{
        getCurrentUser()
    },[])

    const fetchDates = async () => {

    }
    const saveReview = async (e) =>{
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('opinion', opinion)
        formData.append('rating', rate)
        const confirmar = await Swal.fire({
            title: 'Saving a review',
            text: "Do you want to save this review?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            return result.value;
          });
          console.log(confirmar);
          if(!confirmar){
            return;
          }
          await axios.post(`http://localhost:8000/api/dates/${iddate}`, formData).then(({data})=>{
            Swal.fire({
                icon:"success",
                text: "The review is now saved!"
            })
            getCurrentUser()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    const deleteDate = async (id) => {
        const confirmar = await Swal.fire({
            title: 'Are you sure?',
            text: "If you cancel, you need to add again your date!",
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
          await axios.delete(`http://localhost:8000/api/dates/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            getCurrentUser()
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
            </div>
            <Form onSubmit={saveReview}> 
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Related service</th>
                                    <th>A.B. shop</th>
                                    <th>Your Stylist</th>
                                    <th>Final Style</th>
                                    <th>Date</th>
                                    <th>Hour</th>
                                    <th>Cost</th>
                                    <th>Review</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Dates.length > 0 && (
                                        Dates.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.servicename}</td>
                                                <td>
                                                    <div>
                                                        {row.shopname}
                                                    </div>
                                                    <div>
                                                    <img width="15%" height="13%" src={`./storage/shops/image/${row.shopfoto}`} />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div>
                                                        {row.username}
                                                    </div>
                                                    <div>
                                                    <img width="20%" height="16%" src={`./storage/stylist/image/${row.stylistfoto}`} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {row.stylename + ": " + row.colorname}
                                                    </div>
                                                    <div>
                                                    <img width="20%" style={{borderRadius:100}} height="16%" src={`./storage/color/image/${row.colorfoto}`} />
                                                    </div>
                                                </td>
                                                <td>{row.date}</td>
                                                <td>{row.hour}</td>
                                                <td>{row.cost}</td>
                                                <td>{(row.ok == '1') ? 
                                                    <div style={{display: 'flex'}}>
                                                        <div>
                                                            <input type="text" value ={opinion} onChange={(event)=> setOpinion(event.target.value)} placeholder="Write an opinion"/>
                                                            <ReactStars
                                                                count={5}
                                                                onChange={(newRating)=>setRate(newRating)}
                                                                size={12}
                                                                activeColor="blue"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Button onClick={()=> setIdDate(row.iddate) } type="submit"  variant="outline-primary">Save review</Button>
                                                        </div>
                                                    </div> : "Pendient date 😶"
                                                    }
                                                </td>
                                                <td>
                                                    {(row.ok == '0')?
                                                    <Button variant="danger" onClick={()=>{ deleteDate(row.iddate)}}>
                                                        Delete
                                                    </Button> : "" }

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
            </Form>
          </div>
      </div>
    )
}