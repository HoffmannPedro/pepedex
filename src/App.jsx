import { useEffect, useRef, useState } from 'react'
import './App.css'

import PokedexShell from './components/PokedexShell';
import SearchBar from './components/SearchBar';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonTypes from './components/PokemonTypes';
import StatsTable from './components/StatsTable';
import Dpad from './components/Dpad';
import LightsPanel from './components/LightsPanel';
import PowerButton from './components/PowerButton';

import powerOnSound from './assets/sounds/power-on.wav';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [statusLight, setStatusLight] = useState('off');

  const audioRef = useRef(null);

  
  // Carga la lista completa de Pokémon
  useEffect(() => {
    fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon?limit=10000')
    .then(res => res.json())
    .then(data => setPokemonList(data.results))
    .catch(console.error);
  }, []);
  
  // Enciende o apaga la pokedex
  const handlePowerToggle = () => {
    if (!isOn) {
      audioRef.current?.play().catch(() => {

      })

      // Encender
      setIsOn(true);
      setStatusLight('loading');

      // Seleccionar el primer pokémon de la lista
      if (pokemonList.length > 0) {
        fetchAndSet(pokemonList[0].name);
      }
    } else {
      // Apagar
      setIsOn(false);
      setStatusLight('off');
      setPokemonInfo(null);
      setCurrentIndex(null);
    }
  }

  // Función genérica para fetch y actualizar estado
  const fetchAndSet = async (identifier) => {
    if (!isOn) return;  // No busca si esta apagada.
    setStatusLight('loading')  // Luz naranja.


    try {
      const res = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${identifier.toLowerCase()}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPokemonInfo(data);

      // Actualiza el indice según la lista
      const idx = pokemonList.findIndex(p => p.name === data.name);
      setCurrentIndex(idx);
      setStatusLight('success'); // Luz verde.
    } catch {
      setStatusLight('error');   // Luz roja.
      alert('Pokemon no encontrado');
    }
  };

  // Disparada por el buscador
  const getPokemon = () => {
    if (!searchTerm.trim()) {
      alert("Ingresa un nombre o ID para continuar");
      return;
    }

    if (searchTerm.toLocaleLowerCase() === "red") {
      alert("Pokemon not found");
      setSearchTerm("");  // Limpiamos aún si no existe
      return;
    }

    fetchAndSet(searchTerm.trim());
    setSearchTerm("");
  };

  // Navegación de cruceta
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevName = pokemonList[currentIndex - 1].name;
      fetchAndSet(prevName);
    }
  };

  const handleNext = () => {
    if (currentIndex < pokemonList.length - 1) {
      const nextName = pokemonList[currentIndex + 1].name;
      fetchAndSet(nextName);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={powerOnSound}
        preload='auto' />

      <PokedexShell>
        <PokemonDisplay info={pokemonInfo} />
        <Dpad
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={!isOn || currentIndex <= 0}
          disableNext={!isOn || currentIndex === null || currentIndex >= pokemonList.length - 1}
        />
        <PokemonTypes types={pokemonInfo?.types} />
        <StatsTable stats={pokemonInfo?.stats} />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchClick={getPokemon}
          disabled={!isOn}
        />
        <PowerButton
          isOn={isOn}
          onToggle={handlePowerToggle}
        />
        <LightsPanel
          isOn={isOn}
          status={statusLight}
        />
      </PokedexShell>
    </>
  )
}

export default App





























































// return (
//   <>
//     <div className="img-header">
//       <img src="/pokemon_logo_redimensionado.png" alt="pokemon_logo" />
//     </div>
//     <div className="container">
//       <div className="header">
//         <div className="search-container">
//           <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id='search-input' required />
//           <button id="search-button" onClick={getPokemon}>
//             Search
//           </button>
//         </div>
//       </div>
//       <div className="pokedex">
//         <div className="pokemon-info">
//           <div className="name-id disp-fl-rd">
//             <h4>{pokemonInfo ? pokemonInfo.name.toUpperCase() : ""}</h4>
//             <h4>{pokemonInfo ? `#${pokemonInfo.id}` : ""}</h4>
//           </div>
//           <div id="img-container">
//             <img src="whos that pokemon.png" className="sprite-container" />
//             {pokemonInfo && pokemonInfo.sprites && pokemonInfo.sprites.front_default && (
//               <img src={pokemonInfo ? pokemonInfo.sprites.front_default : "/assets/invisible.png"} id='sprite' alt="Pokemon sprite" />
//             )}

//           </div>
//           <div className="we-he disp-fl-rd">
//             <div id="weight">{pokemonInfo ? `${pokemonInfo.weight} KG` : ""}</div>
//             <div id="height">{pokemonInfo ? `${pokemonInfo.height} Mts` : ""}</div>
//           </div>

//           <div id="types">
//             {pokemonInfo && pokemonInfo.types.map(({type}) => (
//               <p key={type.name} className={type.name}>
//                 {type.name}
//               </p>  
//             ))}
//           </div>

//           <div className="pokemon-stats">
//             <table className="table-container">
//               <thead>
//                 <tr className="table-row">
//                   <th>Stats</th>
//                   <th>Base</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pokemonInfo &&
//                   pokemonInfo.stats.map((statObj) => (
//                     <tr key={statObj.stat.name} className='table-row'>
//                       <td>{statObj.stat.name.replace('-', ' ').toUpperCase()}:</td>
//                       <td>{statObj.base_stat}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// )
// }