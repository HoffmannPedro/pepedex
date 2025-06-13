import {useRef} from 'react';
import '../styles/Dpad.css';

import navigateSound from '../assets/sounds/navigate.wav';

export default function Dpad({ 
    onPrev, 
    onNext,
    onVolumeUp,
    onVolumeDown,
    onMuteToggle,
    isMuted,
    disablePrev, 
    disableNext,
    disableUp,
    disableDown
}) {

    const navAudioRef = useRef(null);

    // Función auxiliar que reproduce antes de invocar el handler
    const handlePrevClick = () => {
        // Handle de sonido.
        // if (navAudioRef.current) {
        //     navAudioRef.current.currentTime = 0;
        //     navAudioRef.current.play().catch(() => {});
        // }

        // Handle sonido con volúmen.
        // if (navAudioRef.current) {
        //     navAudioRef.current.volume = isMuted ? 0 : (onPrev ? 1 : 1);
        //     navAudioRef.current.play();
        // }

        onPrev && onPrev();
    };

    const handleNextClick = () => {
        // Handle de sonido.
        // if (navAudioRef.current) {
        //     navAudioRef.current.currentTime = 0;
        //     navAudioRef.current.play().catch(() => {});
        // }

        // Handle sonido con volúmen.
        // if (navAudioRef.current) {
        //     navAudioRef.current.volume = isMuted ? 0 : (onPrev ? 1 : 1);
        //     navAudioRef.current.play();
        // }

        onNext && onNext();
    };

    const handleVolumeUpClick = () => {
        onVolumeUp && onVolumeUp();
    }
    const handleVolumeDownClick = () => {
        onVolumeDown && onVolumeDown();
    }
    const handleMuteClick = () => {
        onMuteToggle && onMuteToggle();
    }

    return (
        <>
            <audio ref={navAudioRef} src={navigateSound} preload='auto' />

            {/* Volume Up/Down */}
            <button 
                className='dpad-button up'
                onClick={handleVolumeUpClick}
                title='Volumen +'
                disabled={disableUp}>
                    ↑
            </button>
            <button 
                className='dpad-button down'
                onClick={handleVolumeDownClick}
                title='Volumen -'
                disabled={disableDown}>
                    ↓
            </button>

            {/* Izquierda y derecha */}
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

            {/* Mute */}
            <button 
                className={`dpad-button mute ${isMuted ? 'muted' : ''}`}
                onClick={handleMuteClick}
                title={isMuted ? 'Desmutear' : 'Mutear'}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </>
    )
}
