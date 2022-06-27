export const FORMAT_TIME = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secondsLeft
    .toString()
    .padStart(2, "0")}`;
};
