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


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [statusLight, setStatusLight] = useState('off');

  const [isShuttingDown, setIsShuttingDown] = useState(false);

  
  // Carga la lista completa de Pokémon
  useEffect(() => {
    fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon?limit=10000')
    .then(res => res.json())
    .then(data => setPokemonList(data.results))
    .catch(console.error);
  }, []);

  // UseEffect que reacciona a un cambio en 'isOn' y si 'pokemonList' está lleno.
  useEffect(() => {
    // Si esta encendida y hay al menos un Pokémon cargado, trae el primero.
    if (isOn && pokemonList.length > 0) {
      fetchAndSet(pokemonList[0].name)
    }
  }, [isOn, pokemonList])
  
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

  // Enciende o apaga la pokedex
  const handlePowerToggle = () => {
    if (!isOn) {

      // Encender
      setIsOn(true);
      setStatusLight('loading');
      setIsShuttingDown(false);
    } else {
      // Apagar
      setIsShuttingDown(true);
      setIsOn(false);
      setStatusLight('off');
      setPokemonInfo(null);
      setCurrentIndex(null);
    }
  }

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
      <PokedexShell>
        <PokemonDisplay info={pokemonInfo} isShuttingDown={isShuttingDown} />
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
