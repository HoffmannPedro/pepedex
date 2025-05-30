import React from 'react';
import '../styles/PowerButton.css';


export default function PowerButton({ isOn, onToggle }) {
    return (
        <button
            className={`power-button ${isOn ? 'on' : 'off'}`}
            onClick={onToggle}
        >
            <svg
                className="power-icon"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            >
                <path d="M12 2v10" />
                <path d="M5.171 5.171a9 9 0 0112.728 0 
                  9 9 0 010 12.728 
                  9 9 0 01-12.728 0 
                  9 9 0 010-12.728z" />
            </svg>
        </button>
    )
}
