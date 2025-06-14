import React, { useEffect, useRef } from 'react'
import '../styles/PokemonDisplay.css';
import { motion, AnimatePresence } from 'framer-motion';

import ballOpenSound from '../assets/sounds/ball-open.wav';
import ballCloseSound from '../assets/sounds/ball-close.wav';

export default function PokemonDisplay({ info, isShuttingDown, volume  }) {
    // Refs para los audios
    const openAudioRef = useRef(null);
    const closeAudioRef = useRef(null);

    // Ref para saber si es el primer 'info' que llega.
    const prevId = useRef(null);

    // Evita reproducir close-ball cuando se apaga la pokedex.
    useEffect(() => {
        if (info === null) {
            prevId.current = null;
        }
    }, [info]);

    useEffect(() => {
        if (!info) return;

        if (openAudioRef.current) openAudioRef.current.volume = volume;
        if (closeAudioRef.current) closeAudioRef.current.volume = volume;
        
        if (prevId.current === null) {
            // Reproduce apertura inmediatamente.
            openAudioRef.current?.play();
        } else {
            if (!isShuttingDown) {
                closeAudioRef.current?.play();
                // Si el componente va a desmontarse (o info cambia), reproduce.
                setTimeout(() => {
                    openAudioRef.current?.play();
                }, 1200);
            }
            
            
            // Si el componente va a desmontarse (o info cambia), reproduce.
            closeAudioRef.current?.play();

            setTimeout(() => {
                openAudioRef.current?.play();
            }, 1200);
        }
        prevId.current = info.id;
    }, [info, volume]);

    if (!info) return null; //Nada que mostrar si no hay pokémon

    const variants = {
        hidden: {
            scale: 0,
            opacity: 0,
            rotate: 0,
            filter: "brightness(1) drop-shadow(0 0 0px white)"
        },
        capture: {
            // captura: gira, achica Y hace el flash
            scale: 0.2,
            opacity: 0,
            rotate: 360,
            filter: [
                "brightness(50) drop-shadow(0 0 0px white)", 
                "brightness(1) drop-shadow(0 0 15px white)"],
            transition: {
                rotate: { duration: 1, ease: "easeIn" },
                scale: { duration: 0.6, ease: "easeIn" },
                filter: { duration: 0.6, ease: "easeOut" }
            }
        },
        release: {
            // aparición: rebota y hace el flash
            scale: 1,
            opacity: 1,
            rotate: 0,
            filter: [
                "brightness(50) drop-shadow(0 0 0px white)", 
                "brightness(1) drop-shadow(0 0 15px black)"],
            transition: {
                scale: { type: "spring", stiffness: 120, damping: 12, duration: 0.6 },
                opacity: { duration: 0.3 },
                filter: { duration: 0.6, ease: "easeOut", delay: 0.2 }
            }
        }
    };

    return (
        <div className='pokemon-display'>
            <audio ref={openAudioRef} src={ballOpenSound} preload='auto' />
            <audio ref={closeAudioRef} src={ballCloseSound} preload='auto' />

            <div className='sprite-wrapper'>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={info.id}                     // clave distinta por cada Pokémon
                        src={info.sprites.front_default}
                        alt={`${info.name} sprite`}
                        className="pokemon-sprite"
                        variants={variants}
                        initial="hidden"
                        animate="release"
                        exit="capture"
                    />

                </AnimatePresence>
            </div>
            <div className='info-text'>
                <h4 className='pokemon-name'>{info.name.toUpperCase()}</h4>
                <h4 className='pokemon-id'>{`#${info.id}`}</h4>
            </div>
        </div>
    )
}
