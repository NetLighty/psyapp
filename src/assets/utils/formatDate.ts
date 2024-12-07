export const formatDate = (date: Date) => {
  const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const months = [
    'янв.',
    'февр.',
    'март',
    'апр.',
    'май',
    'июнь',
    'июль',
    'авг.',
    'сент.',
    'окт.',
    'нояб.',
    'дек.',
  ];

  const now = new Date();
  const month = months[date.getMonth()];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();

  if (isToday) {
    return `сегодня ${day} ${month} ${year} ${hours}:${minutes}`;
  } else if (isYesterday) {
    return `вчера ${day} ${month} ${year} ${hours}:${minutes}`;
  } else {
    return `${dayName} ${day} ${month} ${year} ${hours}:${minutes}`;
  }
};