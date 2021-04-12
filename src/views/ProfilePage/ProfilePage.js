import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
// @material-ui/icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {

  const { id,operacion} = props;
  const [flagOperacion, SetFlagOperacion] = useState(operacion);
  const [grisarBotonContinuar,SetGrisarContinuar] = useState(true);
  let alturaFormateada ="";
  let pesoFormateado ="";
  const [pokemonSeleccionado,SetPokemonSeleccionado] = useState(    
    {
    "id":0,
    "nombre":"",
    "tipo":[],
    "altura":0,
    "peso":0,
    "imagen":""
  });
  const GetPokedex = async ()=>{
    const resultado = await axios.get(`https://localhost:44313/pokemon/${id}`);
    SetPokemonSeleccionado(resultado.data);
    alturaFormateada = new Intl.NumberFormat(["ban", "id"]).format(resultado.data.altura);
    pesoFormateado= new Intl.NumberFormat(["ban", "id"]).format(resultado.data.peso);
}

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

  useEffect(() => {
      GetPokedex();
  });

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const GuardarValor = (nombreCampo,valor,pokemon) =>{

    switch (nombreCampo) {
      case "altura":
        pokemon.altura = parseInt(valor);
        break;
      case "peso":
        pokemon.peso = parseInt(valor);
        break;
    
      default:
        pokemon.altura = parseInt(valor);
        break;
    }
    SetPokemonSeleccionado(pokemon);
    SetGrisarContinuar(false);


  }

  const GuardarRegistro = async () => {

      const url = `https://localhost:44313/pokemon/${pokemonSeleccionado.id}`;
      try {
          const resultado = await axios.put(url, pokemonSeleccionado);
          if(resultado.status === 200) {
              Swal.fire(
                  'Operacion Extiosa',
                  'El Registro fue editado Correctamente',
                  'success'
              )
          }
      } catch (error) {
          console.log(error);
         Swal.fire(
              'Operacion Extiosa',
              'El Registro fue editado Correctamente',
              'success'
              )
      }
  }

  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        color="transparent"
        brand={<Link to={`/`}><ArrowBackIcon/></Link>}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/fondo-prueba3.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <br/>
                  <div id="icono-detalle">

                    {
                      flagOperacion === "Get" ? 
                        <IconButton aria-label="delete" onClick={() => {SetFlagOperacion("Put")}}><VisibilityIcon/></IconButton>
                        :  
                        <IconButton aria-label="delete" onClick={() => {SetFlagOperacion("Get")}}><EditIcon/></IconButton>
                    }
                   
                   
                  </div>

                  <div className={classes.name}>
                    <br/>
                    <h3 className={classes.title}>{pokemonSeleccionado.nombre}</h3>
                    <br/>
                    <h4 className={classes.title}>#{pokemonSeleccionado.id}</h4>
                    <Grid container justify="center" spacing={2}>
                      {pokemonSeleccionado.tipo.map(tipo=>{
                          return(
                            <Grid item>
                              <div className={SetTipoIcon(tipo)}></div>
                            </Grid>
                          );
                      })}
                    </Grid>
                  </div>
                  {flagOperacion === "Get"?
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <h4 className={classes.title}>Altura: {pokemonSeleccionado.altura} metros.</h4>
                    </Grid>
                    <Grid item xs={6}>
                      <h4 className={classes.title}>Peso: {pokemonSeleccionado.peso} Kg.</h4>
                    </Grid>
                  </Grid>
                  :
                  flagOperacion === "Put"?
                  <>
                    <h4 id="subtitulo-detalle" className={classes.title}>¿De que altura o peso es tu {pokemonSeleccionado.nombre}?</h4>
                    <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <TextField type="number" id="standard-basic" label="Altura" onChange={(e) => {GuardarValor("altura",e.target.value,pokemonSeleccionado)}}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField  type="number" id="standard-basic" label="Peso" onChange={(e) => {GuardarValor("peso",e.target.value,pokemonSeleccionado)}} />
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                        <Button
                          size="large" className={classes.margin}
                          id="boton-guardar"
                          variant="contained"
                          color="default"
                          disabled= {grisarBotonContinuar}
                          startIcon={<CloudUploadIcon />}
                          onClick ={() => {GuardarRegistro()}}
                        >
                          Upload
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  </>
                  : null
                  
                  }


                </div>
                
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/*

                  <div>
                  <img src={`assets/img/pokedex/${pokemonSeleccionado.imagen}.png`} alt="..." className={imageClasses} />
                  </div>

*/