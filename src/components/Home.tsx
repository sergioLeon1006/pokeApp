import React, {useRef,useState,useEffect} from 'react'
import { Navigate } from "react-router-dom";
import {NavBar,PokemonCard,PokemonSearch} from './index'
import {Allpokemon,searchGetPokemonById} from '../services/index'

export default function Home() {
    const loginValidation = window.localStorage.getItem('session');
    const pokemonString:any = useRef();
    
    const [data, setData]:any = useState([]);
    const [search, setSearch]:any = useState([]);
    const [currentPageUrl, setCurrentPageUrl]:any = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPageUrl, setNextPageUrl]:any = useState();
    const [prevPageUrl, setPrevPageUrl]:any = useState();

    useEffect(() => {
      Allpokemon(currentPageUrl).then(function (response) {
        
        setNextPageUrl(response.next);
        setPrevPageUrl(response.previous)
        setData(response.results);
       
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }, [currentPageUrl])
    
    const next = ()=> {
      setCurrentPageUrl(nextPageUrl);
    }
    const previous = ()=> {
      setCurrentPageUrl(prevPageUrl);
    }

    const searchPokemon = () =>{
      const {value: pokemonName} =  pokemonString.current;
      if (pokemonName) {
        searchGetPokemonById(pokemonName.toLowerCase()).then(function(response:any) {
          setSearch(response);
         
        }).catch(function (error) {
          console.log(error);
            alert("no se encontó el pokemon")
        });
      }else{
        return false
      }
    
    }
    
    const searchState = () => {
      setSearch([]);
    }

    return (
    <>
        { !loginValidation && <Navigate replace to="/login" />}
        <NavBar></NavBar>
        <section className="py-5">
          <div className="flex flex-col max-w-6xl mx-auto space-y-4  ">
          <nav className="navbar bg-light ">
            <div className="container-fluid justify-content-end">
              <div className="d-flex" >
                <input ref={pokemonString} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button onClick={searchPokemon} className="btn btn-outline-danger">Search</button>
              </div>
            </div>
          </nav>
            <div className="row">
            {!search.data  ? data.map((pokemon:any) =>(
                <PokemonCard key={pokemon.url} pokemon={pokemon} ></PokemonCard>
              )) :
              <PokemonSearch key={search.config.url} pokemon={search} searchState={searchState}></PokemonSearch>
              
           
            }
            </div>
            <div className="py-6 p-3">
              {search.data ? '' : prevPageUrl && <button onClick={previous} type="button" className="btn btn-outline-secondary">previous</button>}
              {search.data ? '' : nextPageUrl && <button onClick={next} type="button" className="btn btn-outline-danger">Next</button>}
            </div>
          </div>
        </section>
    </>
  )
}
