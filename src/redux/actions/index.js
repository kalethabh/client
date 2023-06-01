import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAILS = "GET_DETAILS";

export const POKEMON_BY_ID = "POKEMON_BY_ID";
export const POKEMON_BY_NAME = "POKEMON_BY_NAME";

export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";



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

export function getDetail(id) {
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

export function postPokemon(payload) {
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
}

export function PokemonById(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((res) => res.data)
      .then((res) =>
        dispatch({
          type: POKEMON_BY_ID,
          payload: res,
        })
      )
      .catch((err) => console.log(err));
  };
}

export function PokemonByName(searchPoke) {
  return async (dispatch) => {
    try {
      let url = `http://localhost:3001/pokemons/?name=${searchPoke}`;
      let json = await axios.get(url);
      return dispatch({
        type: POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearPokemons() {
  return {
    type: "CLEAR_POKEMONS",
    payload: [],
  };
}

export function setCurrentPage(pageNumber){
  return {
    type: "SET_CURRENT_PAGE",
    payload: pageNumber,
  };
};

