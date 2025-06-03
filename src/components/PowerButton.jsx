import React, { useEffect, useRef } from 'react';
import '../styles/PowerButton.css';

import powerOnSound from '../assets/sounds/power-on.wav';
import powerOffSound from'../assets/sounds/power-off.wav'


export default function PowerButton({ isOn, onToggle }) {

    const onAudioRef = useRef(null);
    const offAudioRef = useRef(null);

    // Para saltar la primera ejecución del useEffect:
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (isOn) {
            onAudioRef.current?.play().catch(() => {

            });
        } else {
            offAudioRef.current?.play().catch(() => {
                
            })
        }
    }, [isOn]);

    return (
        <button
            className={`power-button ${isOn ? 'on' : 'off'}`}
            onClick={onToggle}
        >
            <audio ref={onAudioRef} src={powerOnSound} preload='auto' />
            <audio ref={offAudioRef} src={powerOffSound} preload='auto' />

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
