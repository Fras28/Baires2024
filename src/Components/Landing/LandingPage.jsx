import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import Logo from "../assets/Logo.png";
import { VerPedido } from "../BtnBag/BtnBag";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../assets/Spinner/Spinner";
import Horarios from "../BtnNavidad/Horarios";
import { Foot } from "../Footer/Footer";


export default function LandingPage(url) {
  const { comercio, categorias } = useSelector((state) => state.alldata);
  const API = process.env.REACT_APP_API_STRAPI;
  const id = url.location.pathname.slice(1, 3);


  return (
    <div className="animate__animated animate__zoomIn">
    {!categorias ? <Spinner /> : null}
    <div className="naviLanding titCasa" style={{ 
      // backgroundImage: `url(${comercio?.attributes?.fondo?.data?.attributes?.url})`,
    }}>
      <div className="logoL">
        <NavLink to={`/${id}`}>
          <img src={comercio?.attributes?.logo?.data?.attributes.url} alt="" width="100%" />
        </NavLink>
      </div>
        <div className="navi2">
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
          <Horarios />
          <svg
            width="59"
            height="2"
            viewBox="0 0 59 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M59 0.999995L0 1" stroke="#E88A23" />
          </svg>
        </div>
      </div>

      <div className="conteinerLB2" style={{ backgroundColor: comercio?.attributes?.rgb }}>
        <div className="rowsCardL">
          {categorias?.map((categoria, index) => (
            categoria.attributes.publishedAt && (
              <NavLink
                key={categoria.id}
                className="navLink"
                to={`/${id}/Landing/${categoria.attributes.name}`}
              >
                <div className={`titInicio ${index === categorias.length - 1 && index % 2 === 0 ? "fullWidth" : ""}`}>
                  <img
                    src={categoria?.attributes?.picture?.data?.attributes?.formats?.small?.url || 
                         comercio?.attributes?.logo?.data?.attributes?.url}
                    alt={categoria.attributes.name}
                 
                  />
                  <div>
                    <p className="textCat">{categoria.attributes.name.replace(/\[.*?\]/g, '')}</p>
                  </div>
                </div>
              </NavLink>
            )
          ))}
        </div>
      </div>
      <VerPedido id={id} />
      <Foot />
    </div>
  );
}
