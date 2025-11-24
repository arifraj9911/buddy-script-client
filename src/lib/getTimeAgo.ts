function getMinutesAgo(postTime: string): number {
  const postDate = new Date(postTime);
  const presentDate = new Date();

  const diffMs = presentDate.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  return diffMinutes;
}

export function getTimeAgo(postTime: string): string {
  const mins = getMinutesAgo(postTime);

  if (mins < 1) return "Just Now";
  if (mins < 60) return `${mins} minutes ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);

  return `${years} years ago`;
}
