import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'assets/css/inicio.css';
import {TableContainer, Table,TableHead,TableBody,TableRow,TableCell,IconButton,} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Mock from "Mock/Pokedex.js";

const SectionBasics = (props) => {

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pokedex,SetPokedex] = useState([]);
  const [rellamado,SetRellamado]=useState(true);
  const [page, setPage] = useState(0);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, pokedex.length - page * rowsPerPage);

  const GetPokedex = async ()=>{

      let ServicioMokeado = true;
      if(ServicioMokeado)
      {
        const resultado = Mock;
        SetPokedex(resultado);
      }
      else{
        const resultado = await axios.get('https://localhost:44313/pokemon');
        SetPokedex(resultado.data);
      }
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        tipoElegido=" ";
    }
    return tipoElegido;
  }

  const EditarPokemon = (pokemon) =>{
    console.log(`editando a ${pokemon.nombre}`);
  }

  const VerDetallePokemon = (pokemon) =>{
    console.log(`mostrando a ${pokemon.nombre}`);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if(rellamado)
    {
      GetPokedex();
      SetRellamado(false);
    }
  }, [rellamado]);
  return (
    <>
      <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Altura</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Tipos</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {pokedex.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(pokemon => (
                  <TableRow>
                    <TableCell>{pokemon.id}</TableCell>
                    <TableCell>{pokemon.nombre}</TableCell>
                    <TableCell>{new Intl.NumberFormat(["ban", "id"]).format(pokemon.altura)}</TableCell>
                    <TableCell>{new Intl.NumberFormat(["ban", "id"]).format(pokemon.peso)}</TableCell>
                    <TableCell>
                    <Grid container justify="center" spacing={2}>
                      {pokemon.tipo.map(tipo =>{
                        return(
                          <>
                            <Grid item>
                              <div className={SetTipoIcon(tipo)}></div>
                            </Grid>
                          </>
                        )
                      })}
                    </Grid>
                    </TableCell>
                    <TableCell>
                    <Link
                        to={`/editar/pokemon/${pokemon.id}`}
                        className="btn btn-success mr-2"
                        >
                      <IconButton aria-label="delete" onClick={() => {EditarPokemon(pokemon)}}>
                          <EditIcon/>
                      </IconButton>
                    </Link>
                    <Link
                        to={`/ver/pokemon/${pokemon.id}`}
                        className="btn btn-success mr-2"
                        >
                        <IconButton aria-label="delete" onClick={() => {VerDetallePokemon(pokemon)}}>
                            <VisibilityIcon/>
                        </IconButton>
                    </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25,50,pokedex.length]}
              component="div"
              count={pokedex.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    </>
  )
}
export default SectionBasics;