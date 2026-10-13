import React from 'react';

const ENCRYPTED_CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+?';

export function EncryptedText({
  text,
  encryptedClassName = '',
  revealedClassName = '',
  revealDelayMs = 50,
  onComplete,
}) {
  const [revealedCount, setRevealedCount] = React.useState(0);
  const [scrambleStep, setScrambleStep] = React.useState(0);
  const onCompleteRef = React.useRef(onComplete);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeoutId;
    let completed = false;
    let currentCount = 0;

    function finish() {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeoutId);
      currentCount = text.length;
      setRevealedCount(text.length);
      onCompleteRef.current?.();
    }

    function revealNextCharacter() {
      if (completed) return;
      currentCount += 1;
      setRevealedCount(currentCount);
      setScrambleStep((step) => step + 1);
      if (currentCount >= text.length) {
        finish();
      } else {
        timeoutId = window.setTimeout(revealNextCharacter, revealDelayMs);
      }
    }

    function handleMotionPreferenceChange(event) {
      if (event.matches) finish();
    }

    motionPreference.addEventListener('change', handleMotionPreferenceChange);
    if (motionPreference.matches || text.length === 0) {
      finish();
    } else {
      timeoutId = window.setTimeout(revealNextCharacter, revealDelayMs);
    }

    return () => {
      completed = true;
      window.clearTimeout(timeoutId);
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [revealDelayMs, text]);

  return (
    <span className="encrypted-text" aria-hidden="true">
      {Array.from(text, (character, index) => {
        if (index < revealedCount || character === ' ') {
          return (
            <span className={revealedClassName} key={index}>
              {character}
            </span>
          );
        }

        const characterIndex = (index * 7 + scrambleStep * 11) % ENCRYPTED_CHARACTERS.length;
        return (
          <span className={encryptedClassName} key={index}>
            {ENCRYPTED_CHARACTERS[characterIndex]}
          </span>
        );
      })}
    </span>
  );
}
