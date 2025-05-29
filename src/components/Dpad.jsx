import React from 'react';
import '../styles/Dpad.css';

export default function Dpad({ onPrev, onNext, disablePrev, disableNext }) {
    return (
        <>
            <button
                className='dpad-button left'
                onClick={onPrev}
                disabled={disablePrev}
            >
                ◀
            </button>
            <button
                className='dpad-button right'
                onClick={onNext}
                disabled={disableNext}
            >
                ▶
            </button>
        </>
    )
}
