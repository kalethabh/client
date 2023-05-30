import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Home from "./Home/Home";
import PokemonDetail from "./PokemonDetail/PokemonDetail";
import FormPage from "./FormPage/FormPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/createPokemon" component={FormPage} />
          <Route exact path="/pokemonDetail/:id" component={PokemonDetail } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
