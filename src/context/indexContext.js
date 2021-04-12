import React, { createContext} from 'react';

export const PokemonContext = createContext();

  const PokemonProvider = (props) => {

    const SetTipoIcon = (tipo) =>{
        let tipoPokemon = tipo.toLowerCase();
        let tipoElegido ="";
    
        switch (tipoPokemon) {
          case 'planta':
            tipoElegido="icon_planta";
          break;
          case 'veneno':
           tipoElegido="icon_veneno";
          break;
          case 'agua':
           tipoElegido="icon_agua";
          break;
          case 'bicho':
           tipoElegido="icon_bicho";
          break;
          case 'electrico':
           tipoElegido="icon_electrico";
          break;
          case 'dragon':
           tipoElegido="icon_dragon";
          break;
          case 'fantasma':
           tipoElegido="icon_fantasma";
          break;
          case 'fuego':
           tipoElegido="icon_fuego";
          break;
          case 'hada':
           tipoElegido="icon_hada";
          break;
          case 'hielo':
           tipoElegido="icon_hielo";
          break;
          case 'lucha':
           tipoElegido="icon_lucha";
          break;
          case 'normal':
           tipoElegido="icon_normal";
          break;
          case 'psiquico':
           tipoElegido="icon_psiquico";
          break;
          case 'roca':
           tipoElegido="icon_roca";
          break;
          case 'siniestro':
           tipoElegido="icon_siniestro";
          break;
          case 'tierra':
           tipoElegido="icon_tierra";
          break;
          case 'volador':
           tipoElegido="icon_volador";
          break;
    
          default:
            tipoElegido="icon_volador";
        }
        return tipoElegido;
      }

    return (
        <PokemonContext.Provider
          value={
            SetTipoIcon
          }
        >
            {props.children}
        </PokemonContext.Provider>
    )
}
export default PokemonProvider;