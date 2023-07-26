import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/movies'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search===""){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    
    if (search.length <3){
      setError('La busqueda tiene que tener un minimo de tres caracteres')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}


function App() {

  const {movies} = useMovies()
  const {search, updateSearch, error} = useSearch()
  
  const counter = useRef(0)

  counter.current++
  console.log(counter.current)

  const handleSubmit = (event) =>{
    event.preventDefault()
    //const formData = new window.FormData(event.target)
    //const value = formData.get('query')
    // const value = inputRef.current.value
    console.log(search)
  }

  const handleChange = (event) =>{
    const newSearch = event.target.value
    if (newSearch.startsWith(' '))return
    
    updateSearch(newSearch)

  }



  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} name='query' placeholder='Ghost in the Shell, Dark Knight'/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error} hello</p>}
        
        
      </header>
      
      <main>
        <Movies movies={movies}/>

      </main>
    </div>
  )
}

export default App
