import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAlltypes, postPokemon } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../FormPage/FormPage.css"

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
  });

  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if (
      !noEmpty.test(input.name) ||
      !validateName.test(input.name) ||
      input.name.length < 3
    ) {
      errors.name =
        "Name required. Only string of more than two characters and without numbers";
    }
    if (!validateNum.test(input.hp) || parseInt(input.hp) < 1) {
      errors.hp = "Number required. Higher than one";
    }
    if (!validateNum.test(input.attack) || parseInt(input.attack) < 1) {
      errors.attack = "Number required. Higher than one";
    }
    if (!validateNum.test(input.defense) || parseInt(input.defense) < 1) {
      errors.defense = "Number required. Higher than one";
    }
    if (!validateNum.test(input.speed) || parseInt(input.speed) < 1) {
      errors.speed = "Number required. Higher than one";
    }
    if (!validateNum.test(input.height) || parseInt(input.height) < 1) {
      errors.height = "Number required. Higher than one";
    }
    if (!validateNum.test(input.weight) || parseInt(input.weight) < 1) {
      errors.weight = "Number required. Higher than one";
    }
    if (!validateUrl.test(input.img)) {
      errors.img = "URL required";
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
      dispatch(postPokemon(input));
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
        created: true,
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

  useEffect(() => {
    dispatch(getAlltypes());
  }, [dispatch]);

  return (
    <div className="container">
      <Link to="/home">
        <button className="go-back-button">Go Back</button>
      </Link>
      <form className="pokemon-form" onSubmit={handleSubmit}>
        <h2>Create your Pokémon!</h2>
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
            <p className="error-message">{errors.name}</p>
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
            <p className="error-message">{errors.hp}</p>
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
            <p className="error-message">{errors.attack}</p>
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
            <p className="error-message">{errors.defense}</p>
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
            <p className="error-message">{errors.speed}</p>
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
            <p className="error-message">{errors.height}</p>
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
            <p className="error-message">{errors.weight}</p>
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
            <p className="error-message">{errors.img}</p>
          </div>
        </div>
        <div className="type-selection">
          <select onChange={handleSelect}>
            <option>Select type</option>
            {types?.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {input.types.map((type) => (
            <div className="selected-type" key={type}>
              <p>{type}</p>
              <button onClick={() => handleDelete(type)}>x</button>
            </div>
          ))}
        </div>
        <button type="submit" className="create-button">
          Create!
        </button>
      </form>
    </div>
  );
};

export default FormPage;
