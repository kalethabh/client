import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAILS = "GET_DETAILS";
export const POKEMON_BY_ID = "POKEMON_BY_ID";
export const POKEMON_BY_NAME = "POKEMON_BY_NAME";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const CLEAR_POKE_DETAIL = "CLEAR_POKE_DETAIL";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const SORT_BY_ORDER = "SORT_BY_ORDER";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const url = "http://localhost:5475/pokemons";
      const response = await axios.get(url);
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllTypes = () => {
  return async (dispatch) => {
    try {
      const url = "http://localhost:5475/types";
      const response = await axios.get(url);
      dispatch({
        type: GET_ALL_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:5475/pokemons/${id}`)
      .then((response) => response.data)
      .then((data) =>
        dispatch({
          type: GET_DETAILS,
          payload: data,
        })
      )
      .catch((error) => console.log(error));
  };
};

export const postPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5475/pokemons",
        payload
      );
      dispatch({
        type: POST_POKEMON,
        payload
      });
      alert("¡Nuevo Pokémon creado!");
      return response;
    } catch (error) {
      alert("El nombre del Pokémon ya existe");
      console.log(error);
    }
  };
};

export const PokemonById = (id) => {
  return {
    type: POKEMON_BY_ID,
    payload: id,
  }
};

export const PokemonByName = (searchPoke) => {
  return {
    type: POKEMON_BY_NAME,
    payload: searchPoke,
  };
};


export const clearPokemons = () => {
  return {
    type: CLEAR_POKEMONS,
    payload: [],
  };
};

export const setCurrentPage = (pageNumber) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};

export const filterByTypes = (selectedType) => {
  return {
    type: FILTER_BY_TYPES,
    payload: selectedType,
  };
};

export const clearPokeDetail = () => {
  return {
    type: CLEAR_POKE_DETAIL,
    payload: [],
  };
};

export const filterByAttack = (option) => {
  return {
    type: FILTER_BY_ATTACK,
    payload: option,
  };
};

export const sortByOrder = (order) => {
  return {
    type: SORT_BY_ORDER,
    payload: order,
  };
};

export const filterByOrigin = (origin) => {
  return{
    type: FILTER_BY_ORIGIN,
    payload: origin,
  }
};
