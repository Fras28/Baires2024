import React from "react";
// import { Card } from "./Card/Card";

import "../../Cards/Cards.css";
import { useSelector } from "react-redux";
import { CardPDF } from "./CardPDF";
import { Cards2PDF } from "./Cards2PDF";

export const CardsPDF = ({ products }) => {

const subCat = products?.attributes?.sub_categorias?.data
  const processedName = products?.attributes?.name
  .split(/\(([^)]+)\)/)
  .map(part => part.split(/\[.*?\]/)) // Dividir por corchetes []
  .flat() // Aplanar el array
  .map(part => part.trim())
  .filter(part => part !== ""); // Eliminar elementos vacíos después de la división


  return (
    <>
      {products?.attributes?.articulos?.data?.length !== 0 ? (
        <div className="carta">
          <h2
            className="titleSection"
          >
            <div>
    {processedName?.map((part, index) => (
      <div key={index} style={{ display: "block" }}>
        <span style={{ whiteSpace: "nowrap", fontSize: index % 2 === 0 ? "inherit" : "12px" }}>
          {part}
        </span>
      </div>
    ))}
  </div>


          </h2>
          <div className="rowsCard">
            {subCat.map((producto) => (
              <Cards2PDF products={producto} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

