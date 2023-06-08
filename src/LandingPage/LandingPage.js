import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";
import "./LandingPage.css";
import logo from "../img/ISOLOGO_HENRY_BLACK.png";
import Loading from "../Loading/Loading"; // Importa el componente de carga

export default function LandingPage() {
  const dispatch = useDispatch();
  const listenerPokemons = useSelector((state) => state.allPokemons);
  const [isLoading, setIsLoading] = useState(false);
  const [isPokemonsLoaded, setIsPokemonsLoaded] = useState(false);

  useEffect(() => {
    if (!listenerPokemons.length) {
      setIsLoading(true);
      dispatch(getPokemons());
    } else {
      setIsPokemonsLoaded(true);
    }
  }, [listenerPokemons, dispatch]);

  return (
    <div className="landing-page-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="landing-page-title">Pokemon API</h1>
          <img src={logo} alt="logo" className="logo" />
          <h2 className="k">kalethabh</h2>
          <Link to="/home">
            <button className="landing-page-button">Ingresar</button>
          </Link>
        </>
      )}
    </div>
  );
}
