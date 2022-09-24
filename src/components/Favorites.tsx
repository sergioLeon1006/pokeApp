import React from 'react'
import { Navigate } from 'react-router-dom';
import {NavBar, PokemonCardFavorite} from './index'

export default function Favorites() {
  const loginValidation = window.localStorage.getItem('session');
  const favorites = (localStorage.getItem('favorites') || '[]');
  const arrfavorites = JSON.parse(favorites)

  return (<>
      { !loginValidation && <Navigate replace to="/login" />}
        <NavBar></NavBar>
        <section className="py-5">
          <div className="flex flex-col max-w-6xl mx-auto space-y-4  ">
            <div className="row">
              {arrfavorites.map((pokemon:any) =>(
                <PokemonCardFavorite key={pokemon} pokemon={pokemon} ></PokemonCardFavorite>
              )) }
            </div>
          </div>
        </section>
        </>
  )
}
