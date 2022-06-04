import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateStyles() {
  const navigate = useNavigate();

  //Los hooks sí aplican en funciones
  const [name, setName] = useState("")
  const [cost, setCost] = useState("")
  const [image, setImage] = useState()
  const [genre, setGenre] = useState(1)
  const [service, setService] = useState(1)
  const [services, getServices] = useState([])
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchServices()
  },[]) 

  const fetchServices = async () => {
    await axios.get(`http://localhost:8000/api/services`).then(({data})=>{
        getServices(data);
    });
    
}

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('cost', cost)
    formData.append('image', image)
    formData.append('genre', genre)
    formData.append('id_service', service)

    await axios.post(`http://localhost:8000/api/styles`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/AdminPanel/styles")
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
              <h4 className="card-name">Create new style</h4>
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
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Style name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Cost">
                            <Form.Label>Cost ($)</Form.Label>
                            <Form.Control type ="text"  value={cost} onChange={(event)=>{
                              setCost(event.target.value)
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
                        <Form.Group controlId="Genre">
                            <Form.Label>Genre</Form.Label>
                            <select className="form-control" value={genre} onChange={(event)=>{
                              setGenre(event.target.value), console.log(genre)
                            }}>
                              <option value={1}>Male ♂️</option>
                              <option value={2}>Female ♀️</option>
                              <option value={3}>Unisex ♂️♀️</option>
                            </select>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Service" className="mb-3">
                        <Form.Label>Related Service</Form.Label>
                          <select className="form-control" name="services" options = {services} id="services" onChange={(event)=>{
                              setService(event.target.value), console.log(service)
                            }} value={service}>
                                {services.map((e, key) => {
                                  console.log(key);
                                    return <option key={key} value={e.id}>{e.name}</option>;
                                })}
                          </select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
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