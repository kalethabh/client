import React from "react";
import Nav from "../Nav/Nav";
import Pagination from "../Pagination/Pagination";
import "./Home.css";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";

export default function Home() {
  const isPokemonsLoaded = useSelector((state) => state.isPokemonsLoaded);

  return (
    <div>
      <Nav />
      <div className="home-container">
        <Link to="/">
          <button className="home-button">Back</button>
        </Link>
        {isPokemonsLoaded ? (
          <div className="pagination">
            <Pagination />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
