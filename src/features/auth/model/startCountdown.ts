export function startCountdown({
  onTick,
  shouldStop,
}: {
  onTick: (time: string) => void;
  shouldStop: () => boolean;
}) {
  let seconds = 180;

  const interval = setInterval(() => {
    seconds--;

    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    onTick(`${min}:${sec}`);

    if (seconds <= 0 || shouldStop()) {
      clearInterval(interval);
      return;
    }
  }, 1000);

  return interval;
}
