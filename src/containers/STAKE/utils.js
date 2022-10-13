export const getDay = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  if (now > timestamp) return 0;
  console.log(timestamp, now);
  const day = Math.floor((timestamp - now) / (3600 * 24));
  return day;
};

export const getHour = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  if (now > timestamp) return 0;

  const hour = Math.floor(((timestamp - now) % (3600 * 24)) / 3600);
  return hour;
};
