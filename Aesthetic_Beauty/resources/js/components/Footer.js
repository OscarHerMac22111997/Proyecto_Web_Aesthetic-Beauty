import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p className="about">
                    <span> A little bitt of Us </span>
                    <a className="logoFont"> Aesthetic Beauty</a> is an business
                    formed by  Rosa Isela and  Oscar Eduardo.
                   
                </p>
                <div className="icons">
                    <a href="https://www.facebook.com/Esthetic-Beauty-104358448936113">
                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                    </a>
                    <a href="https://www.instagram.com/beautyaesthetic298/">
                        <FontAwesomeIcon icon="instagram"/>
                    </a>
                </div>
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p>
                        <span> Av. de los Maestros # 1333, Las Américas</span>{" "}
                        Aguascalientes, México.
                    </p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    <p> (+52) 449 807 0281</p>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p>
                        <a href="#"> BeautyAesthetic298@gmail.com</a>
                    </p>
                </div>
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <img
                    alt=""
                    src="./images/logoColorIcon.png"
                    width="90"
                    height="90"
                />{" "}<div className="logoFont">Aesthetic Beauty®</div>
               
                <p className="name">
                    {" "}
                    Aesthetic Beauty &copy; 2022. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
export default Footer;

if (document.getElementById("footer")) {
    ReactDOM.render(<Footer />, document.getElementById("footer"));
}