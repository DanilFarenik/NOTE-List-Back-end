export const getDateOfCreation = (): string => {
  const today: Date = new Date();
  const day: string = String(today.getDate()).padStart(2, '0');
  const mounts: string = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());

  return day + '.' + mounts + '.' + year;
};

export const getDatesOfString = (text: string): string[] => {
  const dates: string[] | null = text.match(
    /(0?[1-9]|[12][0-9]|3[01])([\-/ \.])(0?[1-9]|1[012])[\-/ \.][0-9]{4}/g,
  );

  if (!dates) return [];

  return dates.map((date) => date.replace(/\/|-/g, '.'));
};
