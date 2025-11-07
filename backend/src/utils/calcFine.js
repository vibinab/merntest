export const calcFine = (dueDate, returnDate) => {
  const MS_PER_DAY = 24*60*60*1000;
  const lateDays = Math.max(0, Math.ceil((returnDate - dueDate) / MS_PER_DAY));
  return lateDays * 1; // $1/day
};
