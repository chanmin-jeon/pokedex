import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayPokemon = ({pokemon}) => {

    const [pokemonDataArray, setPokemonDataArray] = useState([])

    useEffect(() => {
        const promises = pokemon.map((pokemon) =>
          axios.get(pokemon.url).then(response => {
            const info = response.data
            const sprite = info.sprites.front_default;
            return {
              name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
              sprite,
            };
          })
        );
    
        Promise.all(promises).then(results => {
          setPokemonDataArray(results);
        });
      }, [pokemon]);

    const getStats = (id) => {
        const poke = pokemonDataArray.find(p => p.name ===id)
        console.log(poke.name)
    }

    return (
        <div className='pokemon-array-container'>
             {pokemonDataArray.map(pokemon => {
                return (
                    <article className='pokemon-article' key={pokemon.name}>
                        <h4>{pokemon.name}</h4>
                        <img src={pokemon.sprite} alt="pokemon sprite" />
                        <button onClick={() => getStats(pokemon.name)}>Get Stats</button>
                    </article>
                )
             })}
        </div>
       
    )
}

export default DisplayPokemon