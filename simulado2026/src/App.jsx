import { useState } from 'react'
import { dadosClima } from './dadosClima'
import { codigosWmo } from './codigosWmo'
import './App.css'

function App() {
  const [busca, setBusca] = useState('')
  const [cidade, setCidade] = useState(null)

  function buscar() {
    const resultado = dadosClima.find(
      item => item.name.toLowerCase() === busca.toLowerCase()
    )

    setCidade(resultado)
  }

  return (
    <div>
      <img src="./src/icons/solchuva.svg" alt="" />
      <h1>Sol Chuva</h1>
      <p>tempo certo e aonde você está</p>

      <input
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="coloque nome da cidade"
      />

      <h2>coloque os dados das cidades: Florianopolis, São Paulo ou Rio de Janeiro e ache as temperaturas</h2>

      <button onClick={buscar}>Buscar</button>
      <p>esses são os dados de "{busca}"</p>

      {cidade && (
        <div>
          <h2>{cidade.name}</h2>
          <p>{cidade.current.time}</p>
          <p>{cidade.current.temperature_2m} °C</p>
          <p>{cidade.current.apparent_temperature} °C (sensação térmica)</p>
          <p>{cidade.current.wind_speed_10m} km/h de vento</p>
          <p>{cidade.current.relative_humidity_2m}% de umidade</p>
          <p>{cidade.current.precipitation} mm de precipitação</p>
          <p>{cidade.current.uv_index} índice UV</p>
          <p>{cidade.current.sunrise} Nascer do sol</p>
          <p>{cidade.current.sunset} Pôr do sol</p>                
        </div>
      )}
    </div>
  )
}

export default App