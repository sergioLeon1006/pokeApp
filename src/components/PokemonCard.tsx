import React, {useState,useEffect} from 'react'
import { GetPokemon } from '../services/index';
import corazon from '../img/corazon.png';
import corazon1 from '../img/corazonFull.png';

export default  function PokemonCard({pokemon}:any) {

  const [pokemonData, setData]:any = useState([]);
  const [isLoading, setLoading] = useState(true); // Loading state
  const [img, setImg]:any = useState(corazon);
  

  useEffect(() => {
     GetPokemon(pokemon.url).then(function (response) {
      setData(response);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
    const favorites = (localStorage.getItem('favorites') || '[]');
    const arrfavorites = JSON.parse(favorites)

    if (arrfavorites.find((i:string) => i === pokemon.url)) {
      setImg(corazon1);
    }

  }, [])
  
  const addFavorites = (photo:string) =>{
    const favorites = (localStorage.getItem('favorites') || '[]');
    const arrfavorites = JSON.parse(favorites)

    if (photo === corazon) {
      setImg(corazon1);
      if (!arrfavorites.find((i:string) => i === pokemon.url)) {
        arrfavorites.push(pokemon.url);
      }
    } else {
      setImg(corazon);
      if (arrfavorites.find((i:string) => i === pokemon.url)) {
        const index = arrfavorites.indexOf(pokemon.url);
        if (index !== -1) {
          arrfavorites.splice(index, 1);
        }
      }
    }

    localStorage.setItem('favorites', JSON.stringify(arrfavorites));
  }
  

  if (isLoading) {
    return (
      <div className="col-md-4 col-sm-6 py-2">
          <div className="card">
          <div className="card-body">
            <p className="card-text">{pokemon.name}</p>
          </div>
        </div>
      </div>
    )
  }else {
    return (
      <div className="col-md-4 col-sm-6 py-2">
        <div className="card">
          {<img src={pokemonData.sprites.front_default} className="cakd-img-top cursor-pointer " alt={pokemonData.name} />}
          <div className="container">
            <hr/>
            <div className="card-body row">
              <p className="text-capitalize">{pokemonData.name}</p>
              <div className="col-6">
                {pokemonData.types.map((type:any,index:number) =>(
                  // console.log(type)
                  <span key={index} className={type.type.name + ' badge rounded-pill '}>{type.type.name}</span> 
                ))}
              </div>
              <div className="col-6 ">
                <img onClick={()=>addFavorites(img)} className="cursor-pointer mx-auto" width="25" height="25" src={img} alt="favorites" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}