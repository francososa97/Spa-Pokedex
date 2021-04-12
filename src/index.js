import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import PokemonContext from 'context/indexContext';

 const Pokedex = () =>{

   return(
     <PokemonContext>
      <Router>
        <Switch>
        <Route path="/editar/pokemon/:id"
            render={props => {
              const idPokemon = parseInt(props.match.params.id);
              return (
                <ProfilePage 
                  id={idPokemon}
                  operacion = "Put"
                />
              )
          }} />
        <Route path="/ver/pokemon/:id" 
                render={props => {
                  const idPokemon = parseInt(props.match.params.id);
                  return (
                    <ProfilePage 
                      id={idPokemon}
                      operacion = "Get"
                    />
                  )
          }} />
        <Route path="/"
          render={props => {
              return (
                <Components/>
              )
          }} />
      </Switch>
      </Router>
    </PokemonContext>
   );
 }

ReactDOM.render(<Pokedex />,document.getElementById("root")
);
