import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllTypes, getPokemons, postPokemon } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./FormPage.css";
import poke from "../img/pokebola.png"

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    img: "",
    createdInBd: true,
  });

  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if ( !noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3 ) {
      errors.name = "Name required. Only string of more than two characters and without numbers";
    }
    if (!validateNum.test(input.hp) || input.hp < 1) {
      errors.hp = "Number required. greater than one";
    }
    if (!validateNum.test(input.attack) || input.attack < 1) {
      errors.attack = "Number required. greater than one";
    }
    if (!validateNum.test(input.defense) || input.defense < 1) {
      errors.defense = "Number required. greater than one";
    }
    if (!validateNum.test(input.speed) || input.speed < 1) {
      errors.speed = "Number required. greater than one";
    }
    if (!validateNum.test(input.height) || input.height < 1) {
      errors.height = "Number required. greater than one";
    }
    if (!validateNum.test(input.weight) || input.weight < 1) {
      errors.weight = "Number required. greater than one";
    }
    if (!validateUrl.test(input.img)) {
      errors.img = "URL image required";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      e.target.value = "Select type";
    } else {
      alert("Two types of pokemon at most");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.hp &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.height &&
      !errors.weight &&
      !errors.img
    ) {
      const updatedInput = {
        ...input,
        createdInBd: true,
      };

      dispatch(postPokemon(updatedInput));
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
        img: "",
        createdInBd: true,
      });
      history.push("/home");
    } else {
      alert("Error. Check the form");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== e),
    });
  };

  const handleNewPokemon = (e) => {
    dispatch(getPokemons());
  };

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <div className="container">
      <Link to="/home">
        <button className="go-back-button">Go Back</button>
      </Link>
      <form className="pokemon-form" onSubmit={handleSubmit}>
        <h2 className="cyp">Create your Pokémon! <img className="pokeImage" src={poke} alt="pokeBola"/></h2>
        <div className="form-group">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="input-group">
            <label>HP:</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={handleChange}
              placeholder="HP"
            />
            {errors.hp && <p className="error-message">{errors.hp}</p>}
          </div>
          <div className="input-group">
            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={handleChange}
              placeholder="Attack"
            />
            {errors.attack && <p className="error-message">{errors.attack}</p>}
          </div>
          <div className="input-group">
            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleChange}
              placeholder="Defense"
            />
            {errors.defense && (
              <p className="error-message">{errors.defense}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleChange}
              placeholder="Speed"
            />
            {errors.speed && <p className="error-message">{errors.speed}</p>}
          </div>
          <div className="input-group">
            <label>Height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={handleChange}
              placeholder="Height"
            />
            {errors.height && <p className="error-message">{errors.height}</p>}
          </div>
          <div className="input-group">
            <label>Weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleChange}
              placeholder="Weight"
            />
            {errors.weight && <p className="error-message">{errors.weight}</p>}
          </div>
          <div className="input-group">
            <label>Image:</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={handleChange}
              placeholder="URL Image..."
            />
            {errors.img && <p className="error-message">{errors.img}</p>}
          </div>
        </div>
        <div>
          <select className="type-selection" onChange={handleSelect}>
            <option>Select type</option>
            {types?.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {input.types.map((type) => (
            <div className="selected-type" key={type}>
              <p className="pTypes">{type}</p>
              <button className="btnDelete" onClick={() => handleDelete(type)}>
                x
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="create-button"
          onClick={handleNewPokemon}
        >
          Create!
        </button>
      </form>
    </div>
  );
};

export default FormPage;
