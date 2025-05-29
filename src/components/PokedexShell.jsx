import React from 'react';
import '../styles/PokedexShell.css';
import pokedexBg from '/pokedex-bg.png';

export default function PokedexShell({ children }) {
  return (
    <div className='pokedex-shell'>
        {children}
    </div>
  )
}
