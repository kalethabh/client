import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonDetail.css";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const myPokemon = useSelector((state) => state.pokeDetail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      <Link to="/home">
        <button className="go-back-buttonD">Go back</button>
      </Link>
        <div className="containerD">
      {myPokemon.length > 0 ? (
        <div className="cardDetail">
          <div>
            <h2 className="card-contentDetail">
              {myPokemon[0].name.charAt(0).toUpperCase() +
                myPokemon[0].name.slice(1)}
            </h2>
            <p className="id">#{myPokemon[0].id}</p>
            <img
              src={myPokemon[0].img ? myPokemon[0].img : "No img"}
              alt="img not found"
              className="card-imageDetail"
            />
            <div>
              <h3>
                {myPokemon[0].types?.map((e, k) => {
                  return (
                    <div key={k}>
                      <p className="textDetail">
                        {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                      </p>
                    </div>
                  );
                })}
              </h3>
            </div>
            <h5 className="attribute">HP: {myPokemon[0].hp}</h5>
            <h5 className="attribute">Attack: {myPokemon[0].attack}</h5>
            <h5 className="attribute">Defense: {myPokemon[0].defense}</h5>
            <h5 className="attribute">Speed: {myPokemon[0].speed}</h5>
            <h5 className="attribute">Height: {myPokemon[0].height}</h5>
            <h5 className="attribute">Weight: {myPokemon[0].weight}</h5>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      </div>
    </div>
  );
};

export default PokemonDetail;
