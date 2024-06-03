import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCancelFav, asyncfavProducts } from "../../redux/slice";
import "./Card.css"; // Asegúrate de tener los estilos necesarios para los checkboxes

const HeartCheckbox = ({ id, checked, onChange }) => (
  <div title="Like" className="heart-container">
    <input id={id} className="checkbox" type="checkbox" checked={checked} onChange={onChange} />
    <div className="svg-container">
      <svg xmlns="http://www.w3.org/2000/svg" className="svg-outline" viewBox="0 0 24 24">
        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
        </path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="svg-filled" viewBox="0 0 24 24">
        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
        </path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="svg-celebrate">
        <polygon points="10,10 20,20"></polygon>
        <polygon points="10,50 20,50"></polygon>
        <polygon points="20,80 30,70"></polygon>
        <polygon points="90,10 80,20"></polygon>
        <polygon points="90,50 80,50"></polygon>
        <polygon points="80,80 70,70"></polygon>
      </svg>
    </div>
  </div>
);

export const Card = ({ producto }) => {
  let { favProd, comercio } = useSelector((state) => state.alldata);
  const dispatch = useDispatch();
  const [articles, setArticles] = useState({
    name: [],
    price: [],
  });
  const [selectedPrice, setSelectedPrice] = useState(producto.attributes.price);

  const product = producto.attributes;
  const thisFav = favProd?.filter((e) => e.attributes.name === product.name);

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  let artAdd = function addArticle(e) {
    setArticles({
      ...articles,
      name: [product.name],
      price: [selectedPrice],
    });
    dispatch(asyncfavProducts({
      ...producto,
      attributes: {
        ...product,
        price: selectedPrice
      }
    }));

    setArticles({
      ...articles,
      name: [],
      price: [],
    });
  };

  let cancelFav = () => {
    dispatch(asyncCancelFav(producto));
  };

  return (
    <div className="CardCont">
      <h2 className="nameProd">{product.name}</h2>
      <div className="contCard">
        <div className="leftInfo">
          <p className="detProd">{product.detail}</p>

          {product.price2 || product.price3 ? (
            <div style={{ display: "flex", gap: "1.5rem", marginTop: ".5rem" }}>
                 <div style={{display:"flex", flexDirection:"column", alignItems:"center"
                }}>

                <HeartCheckbox
                  id="price1"
                  checked={selectedPrice === product.price}
                  onChange={() => handlePriceChange(product.price)}
                />
              <label className="price">
                <b style={{ fontSize: "12px", borderRadius: "50%", whiteSpace: "nowrap" }}>
                  {product.txtPrecio1}
                </b>
                ${product.price}
              </label>
                </div>
              {product.price2 && (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"
                }}>
                  <HeartCheckbox
                    id="price2"
                    checked={selectedPrice === product.price2}
                    onChange={() => handlePriceChange(product.price2)}
                  />
                <label className="price">
                  <b style={{ fontSize: "12px", borderRadius: "50%", whiteSpace: "nowrap" }}>
                    {product.txtPrecio2}
                  </b>
                  ${product.price2}
                </label>
                </div>
              )}
              {product.price3 && (
                     <div style={{display:"flex", flexDirection:"column", alignItems:"center"
                    }}>

                  <HeartCheckbox
                    id="price3"
                    checked={selectedPrice === product.price3}
                    onChange={() => handlePriceChange(product.price3)}
                  />
                <label className="price">
                  <b style={{ fontSize: "12px", borderRadius: "50%", whiteSpace: "nowrap" }}>
                    {product.txtPrecio3}
                  </b>
                  ${product.price3}
                </label>
                    </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p className="price">${product.price}</p>
              {comercio?.attributes?.bag && (
                <div className="divBtnProd">
                  {thisFav.length === 0 ? (
                    <button className="btnPlus" onClick={artAdd}>
                      Agregar
                    </button>
                  ) : (
                    <div className="masMenos">
                      <button className="btn-svg" onClick={cancelFav}>
                        -
                      </button>
                      <p className="cuantiti">{thisFav.length}</p>
                      <button className="btn-svg" onClick={artAdd}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
