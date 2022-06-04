import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "./app.css";
import Swal from 'sweetalert2';
import {Navigate, Route, useNavigate} from 'react-router-dom';

export default function Seconds() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('paquito@gmail.com');
    const [password, setPassword] = useState('123123123');

    const addFormData = (evt) =>{
        if(email !== '' && password !== ''){
            evt.preventDefault();
            const fd = new FormData();
            fd.append("email", email);
            fd.append("password", password);
    
            //call api

                axios.post("http://127.0.0.1:8000/api/login", fd).then((res) => {
                    //Success alert
                    if (res["data"]["status"] === "error") {
                        Swal.fire({
                            title: "OPPS! :(",
                            text: "We have encountered an error with your credentials",
                            type: "warning",
                        });
                    } else {
                        Swal.fire({
                            title: "Welcome back!",
                            text: "You have been logged",
                            type: "success",
                        });
                        const userType = res['data']['fullaccess'][0].fullaccess;
                        const token = res ['data']['data'].token;
                        localStorage.setItem('auth_token', token);
                        localStorage.setItem('email', email);
                        if(userType == 'no')
                            
                            navigate('/ClientPanel/');
                            //return(<Navigate to='clientpanel#/clients/clientdashboards' />);
                            //navigation.navigate('clientpanel#/clients/clientdashboards');
                        if(userType == 'yes')
                            navigate('/AdminPanel/services');
                        if(userType == 'soso')
                            navigate('/StylistPanel/');
                    }
                });

        }else{
            Swal.fire({
                title: "Wait a moment!",
                text: "You need to fill all fields",
                type: "warning",
            });
        }
        
    }
    const handleChange = (event) => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        if (name == 'email')
            setEmail(value);
        if(name == 'password')
            setPassword(value)
        
    }

    const handleSubmit =(event) => {
        event.preventDefault();

        console.log("Prueba de escritorio (datos): ");
    }
    return (
        <div className="formCenter">
            <form className="formFields" onSubmit={handleSubmit}>
                <div className="formField">
                    <label className="formFieldLabel" htmlFor="email">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="formFieldInput"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className="formField">
                    <label className="formFieldLabel" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>

                <div className="formField">
                    <button onClick = {addFormData}className="formFieldButton">Log In</button>{" "}
                </div>

               
            </form>
        </div>
    );

}

if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}