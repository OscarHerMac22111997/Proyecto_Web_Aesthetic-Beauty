import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateShops() {
  const navigate = useNavigate();

  //Los hooks sí aplican en funciones
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [colony, setColony] = useState("")
  const [state, setState] = useState("")
  const [image, setImage] = useState()
  const [validationError,setValidationError] = useState({})

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const CreateShops = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('street', street)
    formData.append('number', number)
    formData.append('colony', colony)
    formData.append('state', state)
    formData.append('image', image)

    await axios.post(`http://localhost:8000/api/shops`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/AdminPanel/shops")
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
              <h4 className="card-name">Create new shop</h4>
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
                <Form onSubmit={CreateShops}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Shop name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type ="text"  value={street} onChange={(event)=>{
                              setStreet(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Number">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="text" value={number} onChange={(event)=>{
                              setNumber(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Colony">
                            <Form.Label>Colony</Form.Label>
                            <Form.Control type="text" value={colony} onChange={(event)=>{
                              setColony(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="State">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={state} onChange={(event)=>{
                              setState(event.target.value)
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