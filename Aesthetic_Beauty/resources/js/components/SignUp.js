import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Swal from 'sweetalert2';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            name: "",
            hasAgreed: false,
        };

        this.addFormData = this.addFormData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addFormData(evt) {
        evt.preventDefault();
        const fd = new FormData();
        fd.append("name", this.state.name);
        fd.append("email", this.state.email);
        fd.append("password", this.state.password);
        console.log(this.state);
        axios
            .post("http://127.0.0.1:8000/api/register", fd)
            .then((res) => {
                //Recibir respuesta de backend
                console.log(res);
                Swal.fire({
                    title: "Hurry",
                    text:
                        res.data["data"]["name"] +
                        " has been registered successfully in our database",
                    type: "success",
                });
            });
    }

    handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
    }

    render() {
        return (
            <div className="formCenter">
                <form onSubmit={this.handleSubmit} className="formFields">
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="formFieldInput"
                            placeholder="Enter your full name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
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
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
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
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="formField">
                        <label className="formFieldCheckboxLabel">
                            <input
                                className="formFieldCheckbox"
                                type="checkbox"
                                name="hasAgreed"
                                value={this.state.hasAgreed}
                                onChange={this.handleChange}
                            />{" "}
                            I agree all statements in{" "}
                            <a href="/terms" className="formFieldTermsLink">
                                terms of service
                            </a>
                        </label>
                    </div>

                    <div className="formField">
                        <button onClick={this.addFormData} className="formFieldButton">Sign Up</button>{" "}
                    </div>
                </form>
            </div>
        );
    }
}
export default SignUp;
if (document.getElementById("signup")) {
    ReactDOM.render(<SignUp />, document.getElementById("signup"));
}
