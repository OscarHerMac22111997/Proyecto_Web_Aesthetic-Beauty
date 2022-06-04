import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  helpers,
  DropShadow,
  Gradient,
} from "rumble-charts";

export default function EditStyles() {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const { id } = useParams()
  const months = [0,0,0,0,0,0,0,0,0,0,0,0];
  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [phone, setPhone] = useState("")
  const [fullaccess, setFullaccess] = useState("soso")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState(null)
  const [regday, setRegday] = useState(null)
  const [id_shop, setId_shop] = useState()
  const [shops, getShops] = useState([])
  const [statics, getStatics] =useState([])
  const [validationError,setValidationError] = useState({})
  useEffect(()=>{
    fetchShops(),
    fetchStylists(),
    fetchStatics()
  },[])

  

  const fetchStatics = async () => {
      await axios
          .get(`http://localhost:8000/api/getStatics`)
          .then(({ data }) => {
              getStatics(data.statics);
              data.statics.forEach(function (data, index) {
                  if (data.mes == "1") months[0] =   parseInt(data.stylistwork);
                  if (data.mes == "2") months[1] =   parseInt(data.stylistwork);
                  if (data.mes == "3") months[2] =   parseInt(data.stylistwork);
                  if (data.mes == "4") months[3] =   parseInt(data.stylistwork);
                  if (data.mes == "5") months[4] =   parseInt(data.stylistwork);
                  if (data.mes == "6") months[5] =   parseInt(data.stylistwork);
                  if (data.mes == "7") months[6] =   parseInt(data.stylistwork);
                  if (data.mes == "8") months[7] =   parseInt(data.stylistwork);
                  if (data.mes == "9") months[8] =   parseInt(data.stylistwork);
                  if (data.mes == "10") months[9] = parseInt(data.stylistwork);
                  if (data.mes == "11") months[10] = parseInt(data.stylistwork);
                  if (data.mes == "12") months[11] = parseInt(data.stylistwork);
              });
              console.log(months);
              const tempo = [
                  { 'name': "January", 'data': [months[0]]},
                  {'name': "February", 'data': [months[1]]},
                  {'name': "March",'data': [months[2]]},
                  {'name': "April",'data': [months[3]]},
                  {'name': "May",'data': [months[4]]},
                  {'name': "June",'data': [months[5]]},
                  {'name': "July",'data': [months[6]]},
                  {'name': "August",'data': [months[7]]},
                  {'name': "September",'data': [months[8]]},
                  {'name': "October",'data': [months[9]]},
                  {'name': "November",'data': [months[10]]},
                  {'name': "December",'data': [months[11]]},
              ];
            tempo.map((e, key) => {const XD = [...series, e]; setSeries(XD)})
          });
  };

  const fetchShops = async () => {
    await axios.get(`http://localhost:8000/api/shops`).then(({data})=>{
      getShops(data);
    });   
  }

  const fetchStylists = async () => {
    await axios.get(`http://localhost:8000/api/users/${id}`).then(({data})=>{
      const { name, genre, phone, email, id_shop } = data.user
      setName(name)
      setGenre(genre)
      setPhone(phone)
      setEmail(email)
      setId_shop(id_shop)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};
  const updateStylist = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('name', name)
    formData.append('genre', genre)
    formData.append('phone', phone)
    formData.append('fullaccess', fullaccess)
    formData.append('email', email)
    formData.append('id_shop', id_shop)
    if(image!==null){
      formData.append('image', image)
    }

    await axios.post(`http://localhost:8000/api/users/${id}`, formData).then
    (({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/AdminPanel/stylists")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
            <tr>
                <th>
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-name"> Modify stylist's information</h4>
                    <hr />
                        <div className="form-wrapper">
                          {Object.keys(validationError).length >   0 && (
                                          <div className="row">
                                              <div className="col-12">
                                                  <div className="alert alert-danger">
                                                      <ul className="mb-0">
                                 {Object.entries( validationError ).map(
                                     ([key, value,]) => ( <li key={key}>{value}
                                 </li>
 ))}
                    </ul>
                     </div>
                       </div>
                         </div>
                          )}
                           <Form onSubmit={updateStylist}>
                            <Row>
                             <Col>
                              <Form.Group controlId="Name">
                                <Form.Label> Change name </Form.Label>
                                 <Form.Control type="text" value={name}
                                  onChange={(event) => {setName(event.target
                                  .value );
                                  }} />
                        </Form.Group>
                       </Col>
                      </Row>
                        <Row>
                         <Col>
                          <Form.Group controlId="genre">
                            <Form.Label>Genre</Form.Label>
                             <select className="form-control" value={genre}
                                onChange={(event) => { setGenre(event.target.value)
                                }}>
                             <option value={1}>Male ♂️</option>
                             <option value={2}>Female ♀️</option>
                             <option value={3}>Other ♂️♀️</option>
                             </select>
                            </Form.Group>
                           </Col>
                          </Row>
                    <Row className="my-3">
                     <Col>
                      <Form.Group controlId="phone">
                       <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" value={phone}
                          onChange={(event) => { setPhone( event.target .value );
                           }}/>
                       </Form.Group>
                      </Col>
                    </Row>
                      <Row className="my-3">
                       <Col>
                        <Form.Group controlId="email">
                         <Form.Label>Email</Form.Label>
                          <Form.Control type="text" value={email} 
                          onChange={(event) => { setEmail( event.target.value);
                            }} />
                        </Form.Group>
                       </Col>
                    </Row>
                    <Row>
                       <Col>
                        <Form.Group controlId="Image" className="mb-3" >
                         <Form.Label> Image </Form.Label>
                          <Form.Control type="file" onChange={ changeHandler}/>
                         </Form.Group>
                       </Col>
                    </Row>

                    <Row>
                     <Col>
                      <Form.Group controlId="id_shop" className="mb-3" >
                       <Form.Label>Related shop</Form.Label>
                        <select className="form-control" 
                         name="id_shop" options={shops} id="id_service" 
                         onChange={(event) => {setId_shop( event.target.value)
                          }} value={id_shop} >
                         {shops.map((e, key) =>
                    {
                     return ( <option key={ key } value={ e.id }>{ e.name} </option>
                            );
                            } )}
                        </select>
                      </Form.Group>
                     </Col>
                    </Row>
                      <Button variant="primary" className="mt-2" size="lg"
                              block="block" type="submit"> Update </Button>
                        </Form>
                       </div>
                      </div>
                     </div>
                    </th>
                  </tr>
              </div>
          </div>
      </div>
  );
}