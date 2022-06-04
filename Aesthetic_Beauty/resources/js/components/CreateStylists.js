import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateStylists() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [phone, setPhone] = useState("")
  const [fullaccess, setFullaccess] = useState("soso")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState(null)
  const [regday, setRegday] = useState("")
  const [id_shop, setId_shop] = useState(3)
  const [shops, getShops] = useState([])
  const [validationError,setValidationError] = useState({})
  useEffect(()=>{
    fetchShops()
  },[])
  const fetchShops = async () => {
    await axios.get(`http://localhost:8000/api/shops`).then(({data})=>{
      getShops(data);
    });   
  }
  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};
  const createStylist = async (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append('name', name)
    formData.append('genre', genre)
    formData.append('phone', phone)
    formData.append('fullaccess', fullaccess)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('id_shop', id_shop)
    formData.append('image', image)

    await axios.post(`http://localhost:8000/api/registerStylist`, formData).then(({data})=>{
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
          <div className="card">
            <div className="card-body">
              <h4 className="card-name">Modify stylist's information</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createStylist}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Change name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="genre">
                            <Form.Label>Genre</Form.Label>
                            <select className="form-control" value={genre} onChange={(event)=>{
                              setGenre(event.target.value), console.log(genre)
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
                            <Form.Control type="text" value={phone} onChange={(event)=>{
                              setPhone(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(event)=>{
                              setPassword(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="id_shop" className="mb-3">
                        <Form.Label>Related shop</Form.Label>
                          <select className="form-control" name="id_shop" options = {shops} id="id_service" onChange={(event)=>{
                              setId_shop(event.target.value), console.log(id_shop)
                            }} value={id_shop}>
                                {shops.map((e, key) => {
                                  console.log(key);
                                    return <option key={key} value={e.id}>{e.name}</option>;
                                })}
                          </select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save now
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}