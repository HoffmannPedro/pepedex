import React from 'react';
import '../styles/PowerButton.css';

export default function PowerButton({ isOn, onToggle }) {
    return (
        <button
            className={`power-button ${isOn ? 'on' : 'off'}`}
            onClick={onToggle}
        >
            {isOn ? 'OFF' : 'ON'}
        </button>
    )
}
