import { useState, useEffect } from 'react'
import pokemonService from './services/pokemon'

import DisplayPokemon from './components/DisplayPokemon'
import Pages from './components/Pages'


function App() {
  const [allPokemon, setAllPokemon] = useState(null)
  const [displayIndexes, setDisplayIndexes] = useState({
    start: 0, 
    end: 50
  })
  const [numPokemon, setNum] = useState(0)
   // getting pokemon data 
  useEffect(() => {
    pokemonService
      .getAll()
      .then(response => {
        return response.results
      })
      .then(initialPokemon => {
        setAllPokemon(initialPokemon)
        setNum(initialPokemon.length)
      })
  },[])

  // conditional render
  if (!allPokemon) {
    return null
  }

  // event handlers to display previous and next 
  const getPrevious = () => {
    let newStart = displayIndexes.start - 50;
    let newEnd = displayIndexes.end - 50;
  
    if (newStart < 0) {
      newStart = 0;
      newEnd = Math.min(50, numPokemon); // Ensure end is within bounds
    }
  
    setDisplayIndexes({ start: newStart, end: newEnd });
    console.log({ start: newStart, end: newEnd });
  }
  
  const getNext = () => {
    let newStart = displayIndexes.start + 50;
    let newEnd = displayIndexes.end + 50;
  
    if (newEnd > numPokemon) {
      newEnd = numPokemon;
      newStart = Math.max(numPokemon - 50, 0); // Ensure start is within bounds
    }
  
    setDisplayIndexes({ start: newStart, end: newEnd });
    console.log({ start: newStart, end: newEnd });
  }

  const pokemonToShow = allPokemon.slice(displayIndexes.start, displayIndexes.end)

  return (
    <>
      <nav>

      </nav>
      <header className='header'>
        Pokedex
      </header>
      <DisplayPokemon pokemon={pokemonToShow} />
      
      <div>
        <Pages getPrevious={getPrevious} getNext={getNext}/>
      </div>
    </>
  )
}

export default App
