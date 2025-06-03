import {useRef} from 'react';
import '../styles/Dpad.css';

import navigateSound from '../assets/sounds/navigate.wav';

export default function Dpad({ onPrev, onNext, disablePrev, disableNext }) {

    const navAudioRef = useRef(null);

    // Función auxiliar que reproduce antes de invocar el handler
    const handlePrevClick = () => {
        // Handle de sonido.
        // if (navAudioRef.current) {
        //     navAudioRef.current.currentTime = 0;
        //     navAudioRef.current.play().catch(() => {});
        // }
        onPrev();
    };

    const handleNextClick = () => {
        // Handle de sonido.
        // if (navAudioRef.current) {
        //     navAudioRef.current.currentTime = 0;
        //     navAudioRef.current.play().catch(() => {});
        // }
        onNext();
    };

    return (
        <>
            <audio ref={navAudioRef} src={navigateSound} preload='auto' />

            <button
                className='dpad-button left'
                onClick={handlePrevClick}
                disabled={disablePrev}
            >
                ◀
            </button>
            <button
                className='dpad-button right'
                onClick={handleNextClick}
                disabled={disableNext}
            >
                ▶
            </button>
        </>
    )
}
