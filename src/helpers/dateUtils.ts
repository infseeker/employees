export const stringToDate = (dateString: string): Date => {
  if (Date.parse(dateString) === NaN) {
    console.error('Date string is not valid');
  }
  return new Date(dateString);
};

export const userDateFormat = (date: Date): string => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;

  return date.toLocaleString('en', options);
};

export const shortUserDateFormat = (date: Date): string => {
  const options = {
    month: 'short',
    day: 'numeric',
  } as const;

  return date.toLocaleString('en', options);
};

export const ageFromDate = (date: Date): number => {
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const distanceToBirthday = (b: Date): number => {
  const birthday = new Date(b);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentYear = currentDate.getFullYear();

  const offset = new Date();
  offset.setHours(0, 0, 0, 0);
  offset.setFullYear(currentYear + 1);

  const newYear = new Date(currentYear + 1);
  birthday.setFullYear(currentYear);
  if (
    newYear.getTime() - birthday.getTime() >
    newYear.getTime() - currentDate.getTime()
  ) {
    birthday.setFullYear(currentYear + 1);
  }

  const diff = birthday.getTime() - currentDate.getTime();
  return diff < 0 ? diff + offset.getTime() : diff;
};

export const daysToBirthday = (birthday: Date): number => {
  return Math.floor(
    distanceToBirthday(new Date(birthday as Date)) / (1000 * 60 * 60 * 24),
  );
};

export const daysToNewYear = (): number => {
  const today = new Date();
  const newYear = new Date(today.getFullYear() + 1, 0, 0);
  const diff = newYear.getTime() - today.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(diff / oneDay);
};
