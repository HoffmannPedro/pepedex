import React from 'react';
import '../styles/PokemonTypes.css';

export default function PokemonTypes({ types }) {
    if (!types) return null;

    return (
        <div className='pokemon-types'>
            {types.map(({type}) => (
                <p key={type.name} className={`type-badge ${type.name}`}>
                    {type.name.toUpperCase()}
                </p>
            ))}
        </div>
    )
}
