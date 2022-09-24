import React from 'react'
import {NavBar, PokemonCardFavorite} from './index'

export default function Favorites() {
  const favorites = (localStorage.getItem('favorites') || '[]');
  const arrfavorites = JSON.parse(favorites)

  return (<>
     
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
