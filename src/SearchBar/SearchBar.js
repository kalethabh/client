import React, { useState } from "react";
import "./SearchBar.css";
import { PokemonById, PokemonByName } from "../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [searchPoke, setSearchPoke] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if(typeof(searchPoke) === "number") dispatch(PokemonById)
    dispatch(PokemonByName(searchPoke));
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchPoke}
        className="input"
        onChange={(e) => setSearchPoke(e.target.value)}
      />
      <button type="submit" className="btn" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
