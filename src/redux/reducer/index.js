import {
  GET_POKEMONS,
  GET_ALL_TYPES,
  POST_POKEMON,
  GET_DETAILS,
  POKEMON_BY_ID,
  POKEMON_BY_NAME,
  CLEAR_POKEMONS,
  SET_CURRENT_PAGE,
} from "../actions/index";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  pokeDetail: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload,
        };
      case GET_ALL_TYPES:
        return {
          ...state,
          types: action.payload,
        };

      case GET_DETAILS:
        return {
          ...state,
          pokeDetail: action.payload,
        };
      case POST_POKEMON:
        return {
          ...state,
        };
      case POKEMON_BY_ID:
        return {
          pokemons: action.payload,
        };

      case POKEMON_BY_NAME:
        return {
          pokemons: action.payload,
        };

      case CLEAR_POKEMONS:
        return {
          pokemons: action.payload,
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return { ...state };
    };
    
};

export default rootReducer;