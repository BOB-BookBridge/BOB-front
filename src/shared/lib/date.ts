export function convertDiffToString(dateString: string) {
  const dateTime = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - dateTime.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years === 0 && months === 0 && weeks === 0 && days === 0 && hours === 0) {
    return `${minutes}분 전`;
  } else if (years === 0 && months === 0 && weeks === 0 && days === 0) {
    return `${hours}시간 전`;
  } else if (years === 0 && months === 0 && weeks === 0) {
    return `${days}일 전`;
  } else if (years === 0 && months === 0) {
    return `${weeks}주 전`;
  } else if (years === 0) {
    return `${months}달 전`;
  } else {
    return `${years}년 전`;
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return [hour, minutes].join(':');
}

export function compareDate(curString: string, prevString: string) {
  const cur = new Date(curString);
  const prev = new Date(prevString);
  if (
    cur.getFullYear() === prev.getFullYear() &&
    cur.getMonth() === prev.getMonth() &&
    cur.getDate() === prev.getDate()
  )
    return false;
  return true;
}
