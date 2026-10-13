import React from 'react';
import { EncryptedText } from './ui/encrypted-text.jsx';

export function Preloader({ onSequenceStart }) {
  const [animationStarted, setAnimationStarted] = React.useState(false);

  function handleAnimationStart() {
    setAnimationStarted(true);
    onSequenceStart();
  }

  return (
    <div
      className="preloader"
      style={{ opacity: 0 }}
      onAnimationStart={handleAnimationStart}
    >
      <div className="preloader-content">
        <p className="preloader-label">Portfolio / Network Systems</p>
        <p className="preloader-message" role="status" aria-live="polite" aria-label="Welcome to the home page.">
          {animationStarted && (
            <EncryptedText
              text="Welcome to the home page."
              encryptedClassName="preloader-encrypted"
              revealedClassName="preloader-revealed"
              revealDelayMs={35}
            />
          )}
        </p>
        <p className="preloader-status">Establishing connection <span aria-hidden="true">···</span></p>
      </div>
    </div>
  );
}
