import React, { useState,useEffect } from 'react'
import {useParams,Link, Navigate} from 'react-router-dom'
import {GetPokemonById,GetPokemonDescription} from '../services'
import {NavBar} from './index';
import corazon from '../img/corazon.png';
import corazon1 from '../img/corazonFull.png';

export default function Pokemon() {
  const loginValidation = window.localStorage.getItem('session');
  const {pokemonId}:any = useParams();
  const [isLoading, setLoading] = useState(true); // Loading state
  const [data, setData]:any = useState([]);
  const [detail, setDetail]:any = useState([]);
  const favorites = (localStorage.getItem('favorites') || '[]');
  const arrfavorites = JSON.parse(favorites)
  const [img, setImg]:any = useState(arrfavorites.find((i:string) => i ===  `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)?corazon1 :corazon);

  useEffect(() => {
    GetPokemonById(pokemonId).then(function (response) {
      setData(response);
      GetPokemonDescription(response.id).then(function (response){
        setDetail(response)
        setLoading(false);
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
    
  }, [pokemonId])
  
  const addFavorites = (photo:string) =>{
    const favorites = (localStorage.getItem('favorites') || '[]');
    const arrfavorites = JSON.parse(favorites)

    if (photo === corazon) {
      setImg(corazon1);
      if (!arrfavorites.find((i:string) => i === `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)) {
        arrfavorites.push(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
      }
    } else {
      setImg(corazon);
      if (arrfavorites.find((i:string) => i === `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)) {
        const index = arrfavorites.indexOf(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        if (index !== -1) {
          arrfavorites.splice(index, 1);
        }
      }
    }

    localStorage.setItem('favorites', JSON.stringify(arrfavorites));
  }

  if (isLoading ) {
    return (
      <NavBar></NavBar>
    )
  }else {
    return(
      <>
      { !loginValidation && <Navigate replace to="/login" />}
        <NavBar></NavBar>
        <div className="container mt-5 mb-5 pt-5">
          <div className="row d-flex justify-content-center">
              <div className="col-md-10">
                  <div className="card">
                      <div className="row">
                          <div className="col-md-6">
                              <div className="images p-3">
                                  <div className="p-4"> 
                                    <div className="row">
                                      <div className="col">
                                        <img className="mx-auto" id="main-image" src={data.sprites.front_default} alt="pokemon-front_default" width="250" /> 
                                      </div>
                                      <div className="col">
                                        <img className="mx-auto"  src={data.sprites.back_default} alt="pokemon-back_default" width="250" /> 
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col"> 
                                      <img className="mx-auto" src={data.sprites.front_shiny} alt="pokemon-front_shiny" width="70"/> 
                                    </div>
                                    <div className="col"> 
                                      <img className="mx-auto" src={data.sprites.back_shiny} alt="pokemon-back_shiny" width="70"/> 
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="product p-4">
                                  <div className="d-flex justify-content-between align-items-center">
                                  <Link to={'/'} className="text-lg no-underline text-grey-darkest hover:text-blue-dark cursor-pointer transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 text-white px-2">Go back</Link>

                                  </div>
                                  <div className="mt-4 mb-3">
                                      <h5 className="text-uppercase">{data.name}</h5>
                                      <div className="price d-flex pt-3 flex-row align-items-center"> 
                                        <span className="fw-semibold">
                                          id: {data.id} <br/>
                                          Height: {data.height} <br/>
                                          Weight: {data.weight} <br/>
                                          base_experience: {data.base_experience}
                                        </span>
                                      </div>
                                  </div>
                                  <p className="about">{detail.flavor_text_entries[0].flavor_text}</p>
                                  <div className="pt-3">
                                    {data.types.map((type:any,index:number) =>(
                                      <span key={index} className={type.type.name + ' badge rounded-pill '}>{type.type.name}</span> 
                                    ))}
                                  </div>
                                  <div className="cart mt-4 align-items-center"> 
                                    <img onClick={()=>addFavorites(img)} className="cursor-pointer" width="25" height="25" src={img} alt="favorites" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </> 
    )
  }
}
