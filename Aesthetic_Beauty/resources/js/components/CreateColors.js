import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateColor() {
  const navigate = useNavigate();

  //Los hooks sí aplican en funciones
  const [name, setName] = useState("")
  const [image, setImage] = useState()
  const [id_style, setId_style] = useState(1)
  const [styles, getStyles] = useState([])
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchStyles()
  },[]) 

  const fetchStyles = async () => {
    await axios.get(`http://localhost:8000/api/styles`).then(({data})=>{
        getStyles(data);
    });
    
}

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const createColor = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('image', image)
    formData.append('id_style', id_style)

    await axios.post(`http://localhost:8000/api/colors`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/AdminPanel/colors")
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
              <h4 className="card-name">Match colors</h4>
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
                <Form onSubmit={createColor}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
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
                      <Form.Group controlId="Style" className="mb-3">
                        <Form.Label>Related Style</Form.Label>
                          <select className="form-control" name="styles" options = {styles} id="id_style" onChange={(event)=>{
                              setId_style(event.target.value), console.log(id_style)
                            }} value={id_style}>
                                {styles.map((e, key) => {
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