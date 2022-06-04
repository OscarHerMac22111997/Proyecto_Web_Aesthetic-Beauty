import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";


export default function Reviews(){

    const navigate = useNavigate();
    const [Rate, setRate] = useState([]);
    const [id_user, setId] = useState();
    const [opinion, setOpinion] = useState('');

    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const id  = data.user[0];
            setId(id);
            axios.get('/api/getRates/'+ data.user[0].id).then(({data})=>{
                console.log(data)
                setRate(data)
                
            })
        })
    }

    useEffect(()=>{
        getCurrentUser()
    },[])


    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
            </div>
            <div className="col-12">
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Comment</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Rate.length > 0 && (
                                        Rate.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.username}</td>
                                                <td>{row.servicename}</td>
                                                <td>{row.date}</td>
                                                <td>{row.opinion}</td>
                                                <td> 
                                                    <ReactStars
                                                        count={5}
                                                        value={row.rate}
                                                        size={12}
                                                        activeColor="blue"/>
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