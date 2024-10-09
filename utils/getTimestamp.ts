export const getTimestamp = (add = 0): number => {
  const currentTime = new Date().getSeconds() + 34875698365893 + add

  return currentTime
}
