import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardMedia, CardContent, CircularProgress } from '@material-ui/core'
import './PokeCard.css'

export default ({pokemon}) => {
  const [info, setInfo] = useState({loading: true, data: ''})

  const capitalize = pokemon.name.charAt(0).toUpperCase()
  const fetchInfo = async () => {
    const response = await fetch(pokemon.entry)
    const { flavor_text_entries } = await response.json()
    setInfo({loading: false, text: flavor_text_entries[0].flavor_text})
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <Card className="Card">
      <CardHeader align='center' title={capitalize  + pokemon.name.slice(1)}/>
      <CardMedia
        component="img"
        className="CardMedia"
        image={pokemon.img}
      />
      <CardContent>
        {
          info.loading ? <CircularProgress /> : info.text
        }
      </CardContent>
    </Card>
  )
}