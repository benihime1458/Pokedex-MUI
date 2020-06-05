import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Grid, TextField, LinearProgress }  from '@material-ui/core'
import PokeCard from './PokeCard'

function App() {
  const [pokedex, setPokedex] = useState({loading: true, data: {}})
  const [query, setQuery] = useState('')

  const getPokemon = async id => {
    let pokemons = {}
    for (let i = 1; i <= 150; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      

      let {id, name, types, species} = await response.json()

      pokemons[id] = {
        id: id,
        name: name, 
        types: types, 
        img: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        entry: species.url
      }
    }
    setPokedex({loading: false, data: pokemons})
  }

  useEffect(() => {
    getPokemon()
  }, []) 

  return (
    <Container className="Container" style={{backgroundColor: '#f44336' }}>
      <div className="Logo">
        <img src="https://fontmeme.com/permalink/200605/8a35d2f5fd2b1d25af23b0f5d04fb8cc.png" alt="pokemon-font" border="0"/>
      </div>
      <TextField 
       className="Search"
       fullWidth
       placeholder="Search by name..."
       variant="outlined"
       margin="normal"
       value={query}
       onChange={e => setQuery(e.target.value)}
      />
      {
        pokedex.loading ? <LinearProgress />
        : 
        <Grid className="Grid" align="center" container spacing={3}>
          {query ? 
            Object.keys(pokedex.data).map(id => {
              if (pokedex.data[id].name.toLowerCase().includes(query.toLowerCase()))
              return <Grid key={id} item xs={4}>
                <PokeCard pokemon={pokedex.data[id]}></PokeCard>
              </Grid>
          })
          : Object.keys(pokedex.data).map(id => {
              return <Grid key={id} item xs={4}>
                <PokeCard pokemon={pokedex.data[id]}></PokeCard>
              </Grid>
          })
          }
        </Grid>
      }
    </Container>
  );
}

export default App;
