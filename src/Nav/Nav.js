import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlltypes
} from "../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAlltypes());
  }, [dispatch]);

  return (
    <nav className="filters-nav">
      <div className="filters-section">
        <label className="label">Filter: </label>
        <select className="select" >
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>
      </div>

      <div className="filters-section">
        <h1 className="label">Types: </h1>
        <select className="select">
          <option value="all">ALL</option>
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
        <select className="select">
          <option>-</option>
          <option className="order">Strength</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
          <option>Alphabetically</option>
          <option value="asc">
            A - Z
          </option>
          <option value="desc">
            Z - A
          </option>
        </select>
      </div>
      <Link to="/createPokemon">
        <button>Create pokemon</button>
      </Link>
      <SearchBar />
    </nav>
  );
};

export default Nav;
