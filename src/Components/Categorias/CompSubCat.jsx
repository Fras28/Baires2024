import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import Nav from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { VerPedido } from "../BtnBag/BtnBag.jsx";
import Spinner from "../assets/Spinner/Spinner.jsx";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import { asyncSubCategoria } from "../redux/slice.jsx";

export const CompSubCat = ({ idCat }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProduct, subCategorias, categorias } = useSelector((state) => state.alldata);
 
  useEffect(() => {
    dispatch(asyncSubCategoria(idCat));
  }, [dispatch, id]);
 
  const articulosParaFiltrar = subCategorias.filter((e) => e.id === idCat);
  const articulos = articulosParaFiltrar.length > 0 ? articulosParaFiltrar[0].attributes.sub_categorias.data : [];
 
  const Productos = allProduct?.filter((e) => e.attributes?.categorias?.data.id === idCat);
 
  const subCategoriaFilters = Productos?.reduce((acc, product) => {
    const subCategoriaId = product.attributes?.sub_categoria?.data?.id;
    if (subCategoriaId) {
      if (!acc[subCategoriaId]) {
        acc[subCategoriaId] = [];
      }
      acc[subCategoriaId].push(product);
    }
    return acc;
  }, []);
 
  const dynamicVariables = Object.keys(subCategoriaFilters).map(key => subCategoriaFilters[key]);
 
  const processedNames = articulos
    .filter(product => product.attributes.articulos.data.length !== 0)
    .map(product => {
      const productName = product.attributes.name;
      return productName.split(/\[.*?\]|\(.*?\)/).map(part => part.trim()).join("");
    });
 
  const img1 = categorias.filter((e) => e.id === idCat);
  const urlImg = img1[0]?.attributes?.picture?.data?.attributes?.url;
 
  return (
    <div className="containerL">
      <Nav id={id} />
      {articulos?.length > 0 && (
        <div className="sectioner">
          <p>Secciones:</p>
          {processedNames.length > 0 && processedNames.map((name, index) => (
            <a key={index} href={`#section-${articulos[index].id}`}>{name}</a>
          ))}
        </div>
      )}
      <div className="conteinerLC">
        {articulos?.length > 0 ? (
          <div className="conteinerLB2 animate__animated animate__zoomIn animate__faster">
            <div className="conteinerLB2 animate__animated animate__zoomIn animate__faster">
              {articulos?.map((prod, index) => (
                <div key={prod.id}>
                  <div id={`section-${prod.id}`} style={{height: index === 0 ? "0" : "110px"}} />
                  {index === 0 && (
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "250px", 
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "white",
                      outline: "solid orange 2px"
                    }}>
                      <img
                        src={urlImg}
                        alt=""
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%"
                        }}
                      />
                    </div>
                  )}
                  <Cards products={prod} />
                </div>
              ))}
            </div>
          </div>
        ) : <Spinner />}
      </div>
      <VerPedido id={id} />
    </div>
  );
 };