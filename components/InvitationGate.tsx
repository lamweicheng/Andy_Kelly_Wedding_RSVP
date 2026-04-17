'use client';

import { useEffect, useState } from 'react';

type InvitationGateProps = {
  children: React.ReactNode;
};

export function InvitationGate({ children }: InvitationGateProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (phase !== 'opening') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase('opened');
      setIsRevealing(true);
    }, 1100);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (!isRevealing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsRevealing(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [isRevealing]);

  useEffect(() => {
    if (phase !== 'opened') {
      return;
    }

    document.body.classList.add('invitation-opened');
    window.dispatchEvent(new Event('invitation:opened'));

    return () => {
      document.body.classList.remove('invitation-opened');
    };
  }, [phase]);

  return (
    <div className="relative">
      <div
        className={`invitation-content ${phase === 'opened' ? 'opacity-100 blur-0' : 'pointer-events-none opacity-0 blur-sm'} ${isRevealing ? 'is-revealing' : ''} transition duration-700`}
      >
        <div className="invitation-reveal-wash" aria-hidden="true" />
        <div className="invitation-reveal-beam invitation-reveal-beam-left" aria-hidden="true" />
        <div className="invitation-reveal-beam invitation-reveal-beam-right" aria-hidden="true" />
        {children}
      </div>

      {phase !== 'opened' ? (
        <div className={`invitation-gate fixed inset-0 z-[80] ${phase === 'opening' ? 'is-opening' : ''}`}>
          <div className="invitation-opening-rays" aria-hidden="true">
            <span className="invitation-opening-ray invitation-opening-ray-one" />
            <span className="invitation-opening-ray invitation-opening-ray-two" />
            <span className="invitation-opening-ray invitation-opening-ray-three" />
          </div>
          <div className="invitation-gate-inner">
            <div className="invitation-envelope-shell">
              <div className="invitation-envelope-back" />
              <div className="invitation-envelope-letter">
                <div className="invitation-letter-title">Andy & Kelly</div>
                <div className="invitation-letter-subtitle">Wedding Invitation</div>
              </div>
              <div className="invitation-envelope-flap" />
              <div className="invitation-envelope-front" />
              <button
                type="button"
                onClick={() => setPhase('opening')}
                className="invitation-seal"
                aria-label="Open invitation"
              >
                <span className="invitation-seal-center">✿</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <div className="font-[family:var(--font-display)] text-[2.2rem] leading-none text-[rgb(var(--headline))] sm:text-[2.8rem]">
                Click to open
              </div>
              <div className="mt-3 text-sm tracking-[0.18em] text-[rgba(126,94,98,0.86)] uppercase">
                A digital invitation for our celebration
              </div>
            </div>
          </div>
          <div className="invitation-opening-curtain invitation-opening-curtain-left" aria-hidden="true" />
          <div className="invitation-opening-curtain invitation-opening-curtain-right" aria-hidden="true" />
        </div>
      ) : null}
    </div>
  );
}