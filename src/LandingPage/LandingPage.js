import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div>
      <h2>By kalethabh</h2>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
