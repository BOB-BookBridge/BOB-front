export function convertDateToString(dateString: string) {
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
