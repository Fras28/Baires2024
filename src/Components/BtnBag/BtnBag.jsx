import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./BtnBag.css";
import "animate.css";

export const VerPedido = ({ id }) => {
  // Obtener el array de productos favoritos del estado global
  const { favProd } = useSelector((state) => state.alldata);

  // Renderizar el enlace al carrito de compras si hay productos favoritos
  return (
    // Verificar si favProd existe y tiene al menos un producto
    favProd && favProd.length > 0 ? (
      <div className="goBag">
        <NavLink className="btnGoBag animate__animated animate__zoomInDown animate__faster" to={`/${id}/Bag`}>
          <p className="pedido">Ver pedido <b className="cantidad">{favProd.length}</b></p>
        </NavLink>
      </div>
    ) : (
      // Renderizar un fragmento vacío si no hay productos favoritos
      <></>
    )
  );
};
