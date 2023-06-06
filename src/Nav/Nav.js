import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTypes, filterByTypes, filterByAttack, sortByOrder, filterByOrigin} from "../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleChangeType = (e) => {
      dispatch(filterByTypes(e.target.value));
  };

    const handleChangeOrder = (e) => {
      dispatch(sortByOrder(e.target.value));
    };

   const handleChangeAttack = (e) => {
     dispatch(filterByAttack(e.target.value));
   };

    const handleChangeOrigin = (e) => {
      dispatch(filterByOrigin(e.target.value));
    };


  return (
    <nav className="filters-nav">
      <div className="filters-section">
        <label className="label">Origen: </label>
        <select className="select" onChange={handleChangeOrigin}>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>
      </div>

      <div className="filters-section">
        <h1 className="label">Type: </h1>
        <select
          className="select"
          onChange={(value) => handleChangeType(value)}
        >
          <option>-</option>
          <option value="all">All</option>
          {allTypes?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filters-section">
        <h1 className="label">Order: </h1>
        <select className="select" onChange={handleChangeOrder}>
          <option value="asc">Upward</option>
          <option value="desc">Falling</option>
          <option value="alpha">Alphabetically</option>
        </select>
      </div>

      <div className="filters-section">
        <h1 className="label">Attack: </h1>
        <select className="select" onChange={handleChangeAttack}>
          <option>-</option>
          <option value="biggest">Biggest</option>
          <option value="minor">Minor</option>
        </select>
      </div>
      <Link to="/createPokemon">
        <button className="boton">Create</button>
      </Link>
      <div className="search">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Nav;
