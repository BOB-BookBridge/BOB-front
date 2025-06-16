import { useState, useEffect } from 'react';
import { startCountdown } from '../model';

export function useEmailVerify(email: string, emailError: boolean) {
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timeText, setTimeText] = useState('03:00');
  const [restartCountdown, setRestartCountdown] = useState(0);

  useEffect(() => {
    if (!showCodeInput || isVerifiedEmail) return;
    const interval = startCountdown({
      onTick: setTimeText,
      shouldStop: () => isVerifiedEmail,
    });
    return () => clearInterval(interval);
  }, [showCodeInput, restartCountdown, isVerifiedEmail]);

  const sendCodeDisabled = !email || emailError;

  function onCodeRequestSuccess() {
    setShowCodeInput(true);
    setTimeText('03:00');
    setRestartCountdown((prev) => prev + 1);
  }

  function onEmailConfirmSuccess() {
    setIsVerifiedEmail(true);
  }

  return {
    isVerifiedEmail,
    showCodeInput,
    timeText,
    setTimeText,
    sendCodeDisabled,
    onCodeRequestSuccess,
    onEmailConfirmSuccess,
  };
}
