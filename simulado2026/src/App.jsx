import { useState } from "react";
import "./App.css";

// 1.1. Camada de configuração
const CONFIG = {
  nomePortal: "Sol Chuva",
  logo: "data:image/svg+xml;utf8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="38" cy="38" r="18" fill="#FFC107"/>
      <path d="M32 70h42a14 14 0 0 0 2-27.8A20 20 0 0 0 37 45a13 13 0 0 0-5 25z" fill="#1570EF"/>
      <path d="M40 76l-3 10M52 76l-3 10M64 76l-3 10" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `),
  chips: ["Florianópolis", "São Paulo", "Rio de Janeiro"],
};

// Códigos WMO simplificados (acesso direto pelo número)
const WMO = {
  0: { desc: "Céu limpo", icone: "☀️" },
  1: { desc: "Predominantemente limpo", icone: "🌤️" },
  2: { desc: "Parcialmente nublado", icone: "⛅" },
  3: { desc: "Nublado", icone: "☁️" },
  45: { desc: "Neblina", icone: "🌫️" },
  48: { desc: "Neblina congelante", icone: "🌫️" },
  51: { desc: "Garoa leve", icone: "🌦️" },
  53: { desc: "Garoa moderada", icone: "🌦️" },
  55: { desc: "Garoa intensa", icone: "🌧️" },
  61: { desc: "Chuva leve", icone: "🌧️" },
  63: { desc: "Chuva moderada", icone: "🌧️" },
  65: { desc: "Chuva intensa", icone: "🌧️" },
  71: { desc: "Neve leve", icone: "🌨️" },
  73: { desc: "Neve moderada", icone: "🌨️" },
  75: { desc: "Neve intensa", icone: "❄️" },
  80: { desc: "Pancadas de chuva leves", icone: "🌦️" },
  81: { desc: "Pancadas de chuva moderadas", icone: "🌧️" },
  82: { desc: "Pancadas de chuva intensas", icone: "🌧️" },
  95: { desc: "Tempestade", icone: "⛈️" },
  96: { desc: "Tempestade com granizo leve", icone: "⛈️" },
  99: { desc: "Tempestade com granizo intenso", icone: "⛈️" },
};

// Dados das cidades
const CIDADES = [
  {
    id: 1,
    name: "Florianópolis",
    admin1: "Santa Catarina",
    country: "Brasil",
    current: {
      temperature_2m: 26,
      apparent_temperature: 28,
      relative_humidity_2m: 78,
      wind_speed_10m: 15,
      precipitation: 0,
      weather_code: 2,
      uv_index: 7.2,
      sunrise: "05:12",
      sunset: "18:53",
    },
    daily: [
      { date: "2026-11-25", weather_code: 2, temperature_2m_max: 28, temperature_2m_min: 21 },
      { date: "2026-11-26", weather_code: 3, temperature_2m_max: 27, temperature_2m_min: 20 },
      { date: "2026-11-27", weather_code: 61, temperature_2m_max: 25, temperature_2m_min: 19 },
      { date: "2026-11-28", weather_code: 63, temperature_2m_max: 24, temperature_2m_min: 18 },
      { date: "2026-11-29", weather_code: 95, temperature_2m_max: 26, temperature_2m_min: 20 },
      { date: "2026-11-30", weather_code: 2, temperature_2m_max: 27, temperature_2m_min: 21 },
      { date: "2026-12-01", weather_code: 0, temperature_2m_max: 29, temperature_2m_min: 22 },
      { date: "2026-12-02", weather_code: 1, temperature_2m_max: 30, temperature_2m_min: 23 },
      { date: "2026-12-03", weather_code: 51, temperature_2m_max: 26, temperature_2m_min: 20 },
      { date: "2026-12-04", weather_code: 2, temperature_2m_max: 28, temperature_2m_min: 21 },
    ],
  },
  {
    id: 2,
    name: "São Paulo",
    admin1: "São Paulo",
    country: "Brasil",
    current: {
      temperature_2m: 23,
      apparent_temperature: 24,
      relative_humidity_2m: 85,
      wind_speed_10m: 8,
      precipitation: 1.2,
      weather_code: 61,
      uv_index: 4.5,
      sunrise: "05:13",
      sunset: "18:36",
    },
    daily: [
      { date: "2026-11-25", weather_code: 61, temperature_2m_max: 25, temperature_2m_min: 18 },
      { date: "2026-11-26", weather_code: 95, temperature_2m_max: 27, temperature_2m_min: 19 },
      { date: "2026-11-27", weather_code: 63, temperature_2m_max: 24, temperature_2m_min: 17 },
      { date: "2026-11-28", weather_code: 3, temperature_2m_max: 23, temperature_2m_min: 16 },
      { date: "2026-11-29", weather_code: 2, temperature_2m_max: 26, temperature_2m_min: 17 },
      { date: "2026-11-30", weather_code: 0, temperature_2m_max: 29, temperature_2m_min: 19 },
      { date: "2026-12-01", weather_code: 1, temperature_2m_max: 30, temperature_2m_min: 20 },
      { date: "2026-12-02", weather_code: 80, temperature_2m_max: 28, temperature_2m_min: 19 },
      { date: "2026-12-03", weather_code: 51, temperature_2m_max: 25, temperature_2m_min: 18 },
      { date: "2026-12-04", weather_code: 3, temperature_2m_max: 24, temperature_2m_min: 17 },
    ],
  },
  {
    id: 3,
    name: "Rio de Janeiro",
    admin1: "Rio de Janeiro",
    country: "Brasil",
    current: {
      temperature_2m: 32,
      apparent_temperature: 36,
      relative_humidity_2m: 70,
      wind_speed_10m: 12,
      precipitation: 0,
      weather_code: 0,
      uv_index: 10.5,
      sunrise: "05:00",
      sunset: "18:20",
    },
    daily: [
      { date: "2026-11-25", weather_code: 0, temperature_2m_max: 34, temperature_2m_min: 25 },
      { date: "2026-11-26", weather_code: 1, temperature_2m_max: 35, temperature_2m_min: 26 },
      { date: "2026-11-27", weather_code: 2, temperature_2m_max: 33, temperature_2m_min: 24 },
      { date: "2026-11-28", weather_code: 95, temperature_2m_max: 32, temperature_2m_min: 23 },
      { date: "2026-11-29", weather_code: 61, temperature_2m_max: 29, temperature_2m_min: 22 },
      { date: "2026-11-30", weather_code: 3, temperature_2m_max: 28, temperature_2m_min: 22 },
      { date: "2026-12-01", weather_code: 2, temperature_2m_max: 30, temperature_2m_min: 23 },
      { date: "2026-12-02", weather_code: 0, temperature_2m_max: 34, temperature_2m_min: 25 },
      { date: "2026-12-03", weather_code: 1, temperature_2m_max: 35, temperature_2m_min: 26 },
      { date: "2026-12-04", weather_code: 80, temperature_2m_max: 31, temperature_2m_min: 24 },
    ],
  },
];

function limparTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function nomeDoDia(dataIso, index) {
  if (index === 0) return "Hoje";
  if (index === 1) return "Amanhã";
  return new Date(dataIso + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long" });
}

export function App() {
  const [busca, setBusca] = useState("");
  const [aviso, setAviso] = useState("");
  const [dados, setDados] = useState(null);

  function pesquisar(nomeCidade) {
    if (!nomeCidade.trim()) {
      setAviso("Digite o nome de uma cidade para buscar.");
      return;
    }

    const encontrada = CIDADES.find((c) => limparTexto(c.name) === limparTexto(nomeCidade));

    if (encontrada) {
      setDados(encontrada);
      setAviso("");
    } else {
      setDados(null);
      setAviso(`Cidade "${nomeCidade}" não encontrada.`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    pesquisar(busca);
  }

  function clicarChip(cidade) {
    setBusca(cidade);
    pesquisar(cidade);
  }

  const climaAtual = dados ? WMO[dados.current.weather_code] : null;

  return (
    <div className="pagina">
      <div className="container">
        {/* Cabeçalho */}
        <header className="cabecalho">
          <img src={CONFIG.logo} alt="solchuva.svg" />
          <h1>{CONFIG.nomePortal}</h1>
        </header>

        {/* Busca e Chips */}
        <section className="box">
          <form className="form-busca" onSubmit={handleSubmit}>
            <input
              type="text"
              list="cidades"
              placeholder="Digite o nome de uma cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <datalist id="cidades">
              {CIDADES.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
            <button type="submit">Buscar</button>
          </form>

          <div className="chips">
            {CONFIG.chips.map((cidade) => (
              <button key={cidade} type="button" onClick={() => clicarChip(cidade)}>
                {cidade}
              </button>
            ))}
          </div>

          {aviso && <p className="aviso">{aviso}</p>}
        </section>

        {/* Resultado */}
        {dados && climaAtual && (
          <>
            {/* Clima Atual */}
            <section className="box">
              <div className="topo-atual">
                <div>
                  <h2>{dados.name}</h2>
                  <p>{dados.admin1}, {dados.country}</p>
                </div>
                <div className="temp-atual">
                  <strong>{dados.current.temperature_2m} °C</strong>
                  <span>{climaAtual.icone} {climaAtual.desc}</span>
                </div>
              </div>

              <div className="grade-detalhes">
                <div><span>Sensação térmica</span><strong>{dados.current.apparent_temperature} °C</strong></div>
                <div><span>Umidade</span><strong>{dados.current.relative_humidity_2m}%</strong></div>
                <div><span>Vento</span><strong>{dados.current.wind_speed_10m} km/h</strong></div>
                <div><span>Precipitação</span><strong>{dados.current.precipitation} mm</strong></div>
                <div><span>Índice UV</span><strong>{dados.current.uv_index}</strong></div>
                <div><span>Nascer do sol</span><strong>{dados.current.sunrise}</strong></div>
                <div><span>Pôr do sol</span><strong>{dados.current.sunset}</strong></div>
              </div>
            </section>

            {/* Previsão 10 dias */}
            <section className="box">
              <h3>Previsão para os próximos 10 dias</h3>
              <div className="grade-dias">
                {dados.daily.slice(0, 10).map((dia, i) => {
                  const climaDia = WMO[dia.weather_code];
                  const dataDDMM = `${dia.date.slice(8, 10)}/${dia.date.slice(5, 7)}`;

                  return (
                    <div key={dia.date} className="card-dia">
                      <strong className="dia-nome">{nomeDoDia(dia.date, i)}</strong>
                      <span>{dataDDMM}</span>
                      <span className="icone">{climaDia.icone}</span>
                      <small>{climaDia.desc}</small>
                      <p>Máx: {dia.temperature_2m_max} °C</p>
                      <p>Mín: {dia.temperature_2m_min} °C</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;