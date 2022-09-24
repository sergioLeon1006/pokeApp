import axios from "axios";

export async function Allpokemon(url: string){

    const data = await fetch(url);
    const response = await data.json();
    return response
}

export async function GetPokemon(url:string){
    const response = await axios.get(url);
    return response.data;  
}

export async function GetPokemonById(id:string){
    if(id){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        return response.data;
    }else{
        return null
    }
      
}

export async function GetPokemonDescription(id:string){
    if(id){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        return response.data;
    }else{
        return null
    }
      
}

export async function searchGetPokemonById(id:string){
    if(id){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        return response;
    }
}