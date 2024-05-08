import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsEdite } from "../Cards/CardsEdit.jsx";
import { asyncAllProducts, asyncArticulos, asyncSubCategoria } from "../redux/slice.jsx";

export const Editer = () => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.alldata);

  useEffect(()=>{
    dispatch(asyncAllProducts())
  },[])


  // Estado para el valor de búsqueda
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="containerEdit">
      <div>
        <label htmlFor="">Buscar</label>
        <input
          type="search"
          name=""
          id=""
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar producto..."
          className="searchBar"
        />
        <h2>Edicion de productos</h2>
        <CardsEdite products={allProduct} />
      </div>
    </div>
  );
};
