'use client';

import { useEffect, useMemo, useState } from 'react';

type HeroTitleProps = {
  text: string;
  className?: string;
};

export function HeroTitle({ text, className = '' }: HeroTitleProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (document.body.classList.contains('invitation-opened')) {
      setIsRevealed(true);
    }

    const onOpened = () => setIsRevealed(true);

    window.addEventListener('invitation:opened', onOpened);

    return () => window.removeEventListener('invitation:opened', onOpened);
  }, []);

  const letters = useMemo(() => text.split(''), [text]);

  return (
    <h1 className={`hero-title ${className}`.trim()} aria-label={text}>
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={`hero-title-letter${isRevealed ? ' is-revealed' : ''}${letter === ' ' ? ' is-space' : ''}`}
          style={{ transitionDelay: `${index * 55}ms` }}
          aria-hidden="true"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
}