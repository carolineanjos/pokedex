import { Card } from "./components/Card"
import { Header } from "./components/Header"
import { useEffect, useState } from "react"
import axios from "axios"

import "./global.scss"
import "./App.scss"


function App() {
  const [pokeInfo, setPokeInfo] = useState()

  const getInfo =  async () => {
    try {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
      .then(response => response?.data?.results)
      .then(results => {
        console.log(results)
        Promise.all(results?.map( async (item) => {
          return await getIndividualPoke(item)
        }))
        .then((res) => {
          return setPokeInfo(res)})
        
      })

    } catch(error) {
      console.error(error)
    }

  }
  const getIndividualPoke = async (data) => {
    try {
      const pokemon = await axios.get(data?.url)
      return pokemon.data
    } catch(error) {
      console.error(error)
      return {}
    }
  }

  useEffect(() => {
    getInfo()
    
  },[])

  return (
    <div>
      <Header/>
      <main>
        {pokeInfo?.map((item) => 
         <Card name={item.name} img={item?.sprites?.front_default} key={item.id} />
        )}
      </main>
    </div>
  )
}

export default App
