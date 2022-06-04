import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "./app.css";
import NormalNavBar from "./NormalNavBar";
import Footer from './Footer'
function Welcome() {
    return (
        <div>

<div className="bg">
                <NormalNavBar></NormalNavBar>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div
                                style={{
                                    fontFamily: "Aesthetic",
                                    fontSize: 50,
                                    color: "black",
                                    textAlign: "center",
                                }}
                            >
                                Welcome to Aesthetic Beauty®
                            </div>
                            <div className="card" style={{ top: 20 }}>
                                <Carousel fade={true} variant="dark">
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://noel.com.mx/img/galeria/1.jpg"
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://noel.com.mx/img/galeria/2.jpg"
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://noel.com.mx/img/galeria/9.jpg"
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="https://noel.com.mx/img/galeria/7.jpg"
                                            alt="Fourth slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

            <footer>
                            <Footer/>
</footer>
        </div>
    );
}

export default Welcome;

if (document.getElementById("welcome")) {
    ReactDOM.render(<Welcome />, document.getElementById("welcome"));
}