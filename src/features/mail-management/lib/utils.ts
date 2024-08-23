const days = ['일', '월', '화', '수', '목', '금', '토'];

export function translateDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}(${days[date.getDay()]}) ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
