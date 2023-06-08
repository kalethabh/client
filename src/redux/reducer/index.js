import {
  GET_POKEMONS,
  GET_ALL_TYPES,
  POST_POKEMON,
  GET_DETAILS,
  POKEMON_BY_ID,
  POKEMON_BY_NAME,
  CLEAR_POKEMONS,
  SET_CURRENT_PAGE,
  FILTER_BY_TYPES,
  CLEAR_POKE_DETAIL,
  FILTER_BY_ATTACK,
  SORT_BY_ORDER,
  FILTER_BY_ORIGIN,
} from "../actions/index";

const initialState = {
  isLoading: false, // Agrega el estado isLoading
  pokemons: [],
  allPokemons: [],
  createdPokemons: [],
  types: [],
  pokeDetail: [],
  filteredPokemons: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        isLoading: false, // Cambia el estado a false cuando los pokemons se han cargado
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
        createdPokemons: [...state.createdPokemons, action.payload],
      };
    case POKEMON_BY_ID:
      const copyDetail = [...state.allPokemons];
      const filteredDetails = copyDetail.filter((p) => p.id === action.payload);
      return {
        ...state,
        pokemons: filteredDetails,
      };
    case POKEMON_BY_NAME:
      const nameFiltered = action.payload
        ? state.allPokemons.filter((p) => p.name === action.payload)
        : [];
      if (!action.payload) {
        alert("Please enter a Pokémon name.");
      } else if (nameFiltered.length === 0) {
        alert("The searched name was not found.");
      }
      return {
        ...state,
        pokemons: nameFiltered.length > 0 ? nameFiltered : state.allPokemons,
      };
    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case FILTER_BY_TYPES:
      const copyAllPokemons = [...state.allPokemons];
      let typeFiltered =
        action.payload === "all"
          ? copyAllPokemons
          : copyAllPokemons.filter((e) =>
              e.types.some((type) => type.name === action.payload)
            );
      if (typeFiltered.length === 0) {
        typeFiltered = copyAllPokemons;
        alert("There are no Pokémon of the indicated type.");
      }
      return {
        ...state,
        pokemons: typeFiltered,
        filteredPokemons: typeFiltered,
        currentPage: 1,
      };
    case FILTER_BY_ATTACK:
      let copyPokemonsAttack = [...state.pokemons];
      let sortedPokemonsAttack;

      switch (action.payload) {
        case "biggest":
          sortedPokemonsAttack = copyPokemonsAttack.sort(
            (a, b) => b.attack - a.attack
          );
          break;
        case "minor":
          sortedPokemonsAttack = copyPokemonsAttack.sort(
            (a, b) => a.attack - b.attack
          );
          break;
        default:
          sortedPokemonsAttack = copyPokemonsAttack;
          break;
      }

      return {
        ...state,
        pokemons: sortedPokemonsAttack,
      };

    case SORT_BY_ORDER:
      let copyPokemons = [...state.pokemons];
      let sortedPokemons;

      switch (action.payload) {
        case "asc":
          sortedPokemons = copyPokemons.sort((a, b) => a.id - b.id);
          break;
        case "desc":
          sortedPokemons = copyPokemons.sort((a, b) => b.id - a.id);
          break;
        case "alpha":
          sortedPokemons = copyPokemons.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        default:
          sortedPokemons = copyPokemons;
          break;
      }

      return {
        ...state,
        pokemons: sortedPokemons,
      };

    case CLEAR_POKE_DETAIL:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case FILTER_BY_ORIGIN:
      let copy = state.allPokemons;
      let createdFiltered;

      switch (action.payload) {
        case "created":
          if (state.createdPokemons.length === 0) {
            alert("There are no pokemons created.");
            return state;
          }
          createdFiltered = copy.filter((e) => e.createdInBd);
          break;
        case "api":
          createdFiltered = copy.filter((e) => !e.createdInBd);
          break;
        default:
          createdFiltered = copy;
          break;
      }

      return {
        ...state,
        pokemons: createdFiltered,
        currentPage: 1,
      };

    default:
      return state;
  }
};

export default rootReducer;
