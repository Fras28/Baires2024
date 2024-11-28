import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingStart.css";
import { useDispatch, useSelector } from "react-redux";
import Morton from "../assets/dog face.png";

export const Inicio = (url) => {
 const dispatch = useDispatch();
 const { comercio } = useSelector((state) => state.alldata);
 const [animateOut, setAnimateOut] = useState(false);

 const toTop = () => {
   window.scrollTo(0, 0);
 };

 toTop();

 const handleButtonClick = () => {
   setAnimateOut(true);
   setTimeout(() => {
     url.history.push(`${url.location.pathname}/Landing`);
   }, 500);
 };

 if (url.location.pathname === "/") {
   url.location.pathname = "/sinMesa";
 }

 return (
   <div className={`LandingBack ${animateOut ? "animate__animated animate__slideOutUp" : ""}`}>
     <div className="landingStart">
       <div style={{ width: "100%" }}>
         <p className="titleSection" style={{
           justifyContent: "center",
           outline: "solid white 2px", 
           border: "none",
           backgroundColor: "#1A1A1A"
         }}>
           {comercio?.attributes?.msjInicio || "Consulta por nuestros desayunos y meriendas libres"}
         </p>
       </div>
       <div className="BottomLanding">
         <div className="contAlerStart">
           <img 
             src={comercio?.attributes?.logo?.data?.attributes?.url} 
             alt="Logo comercio"
             style={{maxWidth:"350px"}}
           />
         </div>

         <div className="btnEnter" onClick={handleButtonClick}>
           <button className="Btn" />
         </div>
         
         <div className="btnEnter2">
           <b style={{
             color:"orange",
             marginBottom:"0", 
             padding:".5rem",
             backgroundColor:"#1A1A1A",
             border:"solid 3px white"
           }}>
             {comercio?.attributes?.direccion}
           </b>
           
           <iframe
             className="IFrame"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.6680012784554!2d-62.2706576!3d-38.702469799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbb5110863bd7%3A0x56650a0f87b8a530!2sAv.%20Leandro%20Niceforo%20Alem%201214%2C%20B8000%20Bah%C3%ADa%20Blanca%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1721865664690!5m2!1ses-419!2sar"
             allowFullScreen=""
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
           />
           
           <Link to="/Comander" className="buttonComander">
             <img src={Morton} alt="Morton icon" width="50px" />
           </Link>
         </div>
       </div>
     </div>
   </div>
 );
};