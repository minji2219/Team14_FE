export const getFormatTime = (time: number[]) => {
  const hours = time[0] >= 10 ? time[0] : '0' + time[0];
  const minutes = time[1] > 10 ? time[1] : '0' + time[1];

  return hours + ':' + minutes + ':' + '00';
};
