import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';

function Card({pokemon}) {
  const { id, name, img, types, attack } = pokemon;

  return (
    <div className="div">
      <div className="card">
        <div>
          <h2 className="card-content"> {name}</h2>
          <Link to={`/pokemonDetail/${id}`}>
            <img src={img} alt={name} className="card-image" />
          </Link>
          <div>
            {types?.map((e, k) => {
              return (
                <div className="types" key={k}>
                  <p className="text">
                    {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                  </p>
                </div>
              );
            })}
            <p>attack: {attack}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
