import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAlltypes, postPokemon} from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

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
        created: true
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
    <div>
      <Link to="/home">
        <button >Go Back</button>
      </Link>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Create a pokemón!</h2>
        <div >
          <div >
            <label >Name:</label>
            <input
  
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Name"
            />
            <p >{errors.name}</p>
            <label >HP:</label>
            <input
             
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="HP"
            />
            <p >{errors.hp}</p>
            <label >Attack:</label>
            <input
              
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Attack"
            />
            <p >{errors.attack}</p>
            <label >Defense:</label>
            <input
              
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Defense"
            />
            <p >{errors.defense}</p>
          </div>
          <div >
            <label >Speed:</label>
            <input
             
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Speed"
            />
            <p >{errors.speed}</p>
            <label >Height:</label>
            <input
              
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Height"
            />
            <p >{errors.height}</p>
            <label >Weight:</label>
            <input
           
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Weight"
            />
            <p >{errors.weight}</p>
            <label >Image:</label>
            <input
            
              type="text"
              value={input.img}
              name="img"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="URL Image..."
            />
            <p >{errors.img}</p>
          </div>
        </div>
        <div>
          <select
           
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            <option>Select type</option>
            {types?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {
            input.types.map((e) => {
              return (
                <div key={e}>
                  <p >{e}</p>
                  <button
                    
                    onClick={() => {
                      handleDelete(e);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            }) //para poder ver que fui seleccionando
          }
        </div>
        <button type="submit">
          Create!
        </button>
      </form>
    </div>
  );
};

export default FormPage;
