import React from 'react';
import '../styles/LightsPanel.css';

export default function LightsPanel({ isOn, status }) {
  return (
    <div className="lights-panel">
      {/* Luz azul grande (indicador de encendido) */}
      <div className={`light big blue ${isOn ? 'on' : ''}`} />

      {/* Tres luces pequeñas */}
      <div className={`light small red    ${status === 'error'   ? 'blink' : ''}`} />
      <div className={`light small orange ${status === 'loading' ? 'blink' : ''}`} />
      <div className={`light small green  ${status === 'success' ? 'blink' : ''}`} />
    </div>
  );
}
