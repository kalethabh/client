import { 
    GET_POKEMONS, 
    GET_ALL_TYPES, 
    POST_POKEMON,
    GET_DETAILS
 } from "../actions/index";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokeDetail: []
}

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
      default:
        return { ...state };
    };
    
};

export default rootReducer;