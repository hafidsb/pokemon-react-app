import React, { useState, useEffect } from "react"
import PokemonList from "./PokemonList"
import Pagination from "./Pagination"
import axios from "axios"


function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    setLoadingState(true)

    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoadingState(false)
      setPokemons(res.data.results.map(res => res.name))
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
    })

    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function getPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  if (loadingState) return "Loading ..."
  console.log("next " + nextPageUrl)
  console.log("prev " + previousPageUrl)
  return (
    <>
      <PokemonList pokemons={pokemons} />
      <Pagination 
        goToPreviousPage={previousPageUrl ? getPreviousPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </>
  );
}

export default App;
