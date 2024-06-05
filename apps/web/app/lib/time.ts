export function parseClock(duration: number): string {
  // pad everything with 0s
  const days = Math.floor(duration / 86400);

  const hours = Math.floor((duration % 86400) / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((duration % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");

  if (days > 0) {
    return `${days} day(s) ${hours}:${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

export function parseFutureDate(date: Date): string {
  const timeSince = (date.getTime() - new Date().getTime()) / 1000;

  if (timeSince < 3600) {
    return `${Math.floor(timeSince / 60)} minutes from now`;
  }

  if (timeSince < 86400) {
    return `${Math.floor(timeSince / 3600)} hours from now`;
  }

  if (timeSince < 172800) {
    return "tomorrow";
  }

  return `${Math.floor(timeSince / 86400)} days from now`;
}

export function parseOldDate(date: Date): string {
  const timeSince = (new Date().getTime() - date.getTime()) / 1000;

  if (timeSince < 86400) {
    return `${Math.floor(timeSince / 3600)} hours ago`;
  }

  if (timeSince < 172800) {
    return "yesterday";
  }

  return `${Math.floor(timeSince / 86400)} days ago`;
}
