import React from "react";
import Nav from "../Nav/Nav";
import Pagination from "../Pagination/Pagination";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="home-container">
        <Link to="/" >
            <button className="home-button">Back</button>
        </Link>
        <div className="pagination">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
