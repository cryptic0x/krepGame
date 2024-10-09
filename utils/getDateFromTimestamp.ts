export const getDateFromTimestamp = (timeStamp: number): string => {
  const currentDate = new Date(timeStamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  // const currentTime = new Date(timeStamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${currentDate}`
  // return `${currentDate} / ${currentTime}`
}
