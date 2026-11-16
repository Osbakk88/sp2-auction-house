// Rewritten by me after understanding the pattern (originally AI-assisted)
export function formatTimeLeft(endsAt: string): string {
  const endDate = new Date(endsAt).getTime();
  const currentTime = Date.now();
  const timeLeft = endDate - currentTime;

  if (timeLeft <= 0) {
    return "Ended";
  }

  const totalMinutes = Math.floor(timeLeft / 60000);

  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m left`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
}

// Rewritten by me after understanding the pattern (originally AI-assisted)
export function isEndingSoon(endsAt: string): boolean {
  const endDate = new Date(endsAt).getTime();
  const currentTime = Date.now();
  const timeLeft = endDate - currentTime;

  const oneDay = 24 * 60 * 60 * 1000;

  return timeLeft > 0 && timeLeft < oneDay;
}
