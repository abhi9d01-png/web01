import React from 'react';
import { EncryptedText } from './ui/encrypted-text.jsx';

export function Preloader({ exiting, onComplete }) {
  return (
    <div className={`preloader${exiting ? ' preloader--exiting' : ''}`} aria-hidden={exiting}>
      <div className="preloader-content">
        <p className="preloader-label">Portfolio / Network Systems</p>
        <p className="preloader-message" role="status" aria-live="polite" aria-label="Welcome to the Matrix, Neo.">
          <EncryptedText
            text="Welcome to the Matrix, Neo."
            encryptedClassName="preloader-encrypted"
            revealedClassName="preloader-revealed"
            revealDelayMs={50}
            onComplete={onComplete}
          />
        </p>
        <p className="preloader-status">Establishing connection <span aria-hidden="true">···</span></p>
      </div>
    </div>
  );
}
