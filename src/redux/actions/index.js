import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAILS = "GET_DETAILS";


export const getPokemons = () => {
  return async (dispatch) => {
    try {
      let url = "http://localhost:3001/pokemons";
      let json = await axios.get(url);
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};



export const getAlltypes = () => {
  return async (dispatch) => {
    try {
      let url = "http://localhost:3001/types";
      let json = await axios.get(url);
      return dispatch({
        type: GET_ALL_TYPES,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export function getDetailPromise(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((res) => res.data)
      .then((res) =>
        dispatch({
          type: GET_DETAILS,
          payload: res,
        })
      )
      .catch((err) => console.log(err));
  };
}

export const postPokemon = (payload) => {
  return async () => {
    try {
      var createPoke = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      console.log(createPoke);
      alert("New pokemón is created!");
      return createPoke;
    } catch (e) {
      alert("Pokemon name already exist");
      console.log(e);
    }
  };
};
