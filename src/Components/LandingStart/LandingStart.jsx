import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AlertDialogSlide from "../BtnNavidad/BtnNavidad";
import "./LandingStart.css";
import { useDispatch, useSelector } from "react-redux";
import Morton from "../assets/dog face.png";
import { asyncCategorias, asyncComercio } from "../redux/slice";
import { ButtonEnter } from "./ButtonEnter/ButtonEnter";
import CtaDNI from "../assets/BaneDNI.png";
const API = process.env.REACT_APP_API_STRAPI;
export const Inicio = (url) => {
  const dispatch = useDispatch();
  const { comercio } = useSelector((state) => state.alldata);
  const [animateOut, setAnimateOut] = useState(false);

  // </svg>

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  toTop();

  const handleButtonClick = () => {
    // Realiza la lógica necesaria antes de la redirección
    setAnimateOut(true);

    // Espera un tiempo suficiente para que la animación ocurra antes de redirigir
    setTimeout(() => {
      url.history.push(`${url.location.pathname}/Landing`);
    }, 500); // Ajusta este tiempo según la duración de la animación
  };

  if (url.location.pathname === "/") {
    url.location.pathname = "/sinMesa";
    console.log(url.location.pathname);
  }

  return (
    <div
      className={`LandingBack ${
        animateOut ? "animate__animated animate__slideOutUp" : ""
      }`}
    >
      <div className="landingStart">
        <div style={{ width: "100%" }}>
          {" "}
          <p
            className="titleSection"
            style={{
              justifyContent: "center",
              outline: "solid white 2px",
              border: "none",
              backgroundColor:`${comercio?.attributes?.rgb}`
            }}
          >
            {comercio?.attributes?.msjInicio ||
              "Consulta por nuestros desayunos y meriendas libres"}
          </p>{" "}
        </div>
        <div className="BottomLanding">
          <div className="contAlerStart">
          <img src={API+comercio?.attributes?.logo?.data?.attributes?.url} alt="" style={{maxWidth:"350px"}}/>
            <AlertDialogSlide />
          </div>

          <div className="btnEnter" onClick={handleButtonClick}>
            {/* <ButtonEnter titulo="Ver Catalogo" /> */}
            <button className="Btn" />
          </div>
          <div className="btnEnter2">
            <b style={{color:"orange", marginBottom:"0"
            }}>{comercio?.attributes?.direccion}</b>
          <iframe
          className="IFrame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.118398361054!2d-62.26270920000004!3d-38.71509059999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcad33685141%3A0xec794b3f20b8b973!2sLamadrid%20%26%20Hip%C3%B3lito%20Yrigoyen%2C%20Bah%C3%ADa%20Blanca%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1716305959709!5m2!1ses-419!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
     
            
            <Link to="/Comander" className="buttonComander">
              <img src={Morton} alt="" width="50px" backgroundColo="white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
