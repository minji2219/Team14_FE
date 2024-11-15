export const parsingTime = (time: string) => {
  const hours = time[0];
  const minutes = time[1];

  return { hours: Number(hours), minutes: Number(minutes) };
};
