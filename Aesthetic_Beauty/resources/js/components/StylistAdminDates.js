import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form'
import ReactStars from "react-rating-stars-component";


export default function StylistAdminDates() {
    const navigate = useNavigate();
    const [Dates, setDates] = useState ([]);
    const [id_user, setId] = useState();
    const [userName, setUserName] =useState('');
    const [serviceName, setServiceName] =useState('');
    const [styleName, setStyleName] =useState('');
    const [colorName, setColorName] =useState('');
    const [show, setShow] = useState(false);
    const [colorfoto, setColorfoto]=useState('');
    const [id_session, setIdSession] = useState();
    const [opinion, setOpinion] = useState('');
    const [rate, setRate] = useState();

    const getCurrentUser = async () => {
        const loc = localStorage.getItem('email');
        await axios.get('/api/getCurrentUser/' + loc).then(({data})=>{
            const id  = data.user[0];
            setId(id);
            axios.get('/api/getClientDates/'+ data.user[0].id).then(({data})=>{
                setDates(data)
                console.log(data)
            })
        })
    }


    useEffect(()=>{
        getCurrentUser()
    },[])

    const startService = async (id) => {
        Dates.map(e =>{
            if(e.idclient == id){
                setUserName(e.username);
                setColorfoto(e.colorfoto);
                setServiceName(e.servicename);
                setColorName(e.colorname);
                setStyleName(e.stylename);
                setShow(true);
                setIdSession(e.iddate)
            }
        })
    }
    const endSession = async (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('ok', '1')
        const confirmar = await Swal.fire({
            title: 'Finish session',
            text: "Do you want to end this session?",
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
          await axios.post(`http://localhost:8000/api/dates/${id_session}`, formData).then(({data})=>{
            Swal.fire({
                icon:"success",
                text: "This session is finished!"
            })
            getCurrentUser();
            setShow(false);
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
            <div className="col-12" style={{display: 'flex',  verticalAlign: 'center'}}>
            <Form onSubmit={endSession}>
                <div style={{backgroundImage: `url(require("./images/logoColorIcon.png"))`, alignItems: 'center', 
                    alingText: 'center', fontFamily: 'Arial', borderWidth: 5,borderColor: 'black'}}>
                        {(show)? (<div><div style={{fontSize: 18}}>
                             {'Client:' + userName}
                        </div>
                        <div style={{fontSize: 15}}>
                             {'Service: ' + serviceName + ' ✂️ \n'} 
                             {'Style: ' + styleName + ' 🎇\n'} 
                             {'Color/Variation: '+colorName + ' 🎨\n'} 
                        </div>
                        <div style={{fontSize: 15}}>
                            {'Reference: '}
                            <img width="35%" height="23%" src={`./storage/color/image/${colorfoto}`} />
                        </div>
                        <div >
                            <Button variant="primary" type="submit">
                                End session
                            </Button>{' '}
                            <Button variant="warning" onClick={()=> setShow(false)}>
                                Escape
                            </Button> 
                        </div>
                        </div>): 
                        <div style={{padding: 10, margin: 10, color: '#FFF', height: '100%',backgroundColor: '#09966c'}}>
                            Pick a date to start the service \@^0^@/
                        </div>}

                </div>
                </Form>
                <div className="card card-body" style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <div className="table-responsive">
                        <div style={{fontFamily: 'Aesthetic', textAlign: 'center',color: "white", backgroundColor: '#2b7d20',fontSize: 15}}>
                             What we'll do?
                        </div>
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Your client</th>
                                    <th>Service</th>
                                    <th>Style</th>
                                    <th>Variation</th>
                                    <th>Hour</th>
                                    <th>Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Dates.length > 0 && (
                                        Dates.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.username}</td>
                                                <td>
                                                    <div>
                                                        {row.servicename}
                                                    </div>
                                                    <div>
                                                    <img width="15%" height="13%" src={`./storage/service/image/${row.servicefoto}`} />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div>
                                                        {row.stylename}
                                                    </div>
                                                    <div>
                                                    <img width="20%" height="16%" src={`./storage/style/image/${row.stylefoto}`} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {row.colorname}
                                                    </div>
                                                    <div>
                                                    <img width="20%" height="16%" src={`./storage/color/image/${row.colorfoto}`} />
                                                    </div>
                                                </td>
                                                <td>{row.hour}</td>
                                                <td>{"$ " + row.cost}</td>
                                                <td>
                                                    <Button variant="primary" onClick={()=> startService(row.idclient)}>
                                                        Start! ✂️
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