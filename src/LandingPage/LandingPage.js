import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";
import "./LandingPage.css";
import logo from "../img/ISOLOGO_HENRY_BLACK.png";

export default function LandingPage() {
  const dispatch = useDispatch();
  const listenerPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [listenerPokemons, dispatch]);

  return (
    <div className="landing-page-container">
      <h1 className="landing-page-title">Pokemon API</h1>
      <img src={logo} alt="logo" className="logo" />
      <h2 className="k">kalethabh</h2>
      <Link to="/home">
        <button className="landing-page-button">Ingresar</button>
      </Link>
    </div>
  );
}
