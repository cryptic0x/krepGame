/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react'
import { track } from '@vercel/analytics/react'
import { useAppContext } from './AppContext'

type ScoreBoardProps = {
  timeInSeconds: number
  extaTime: boolean
  started: boolean
}

const iconHourGlass = (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'>
    <path
      fill='#F9E7C0'
      d='M327.7 173.372c-20.641 20.641-45.275 47.46-48.299 82.362c3.024 34.902 27.659 61.721 48.299 82.362c27.953 24.088 45.652 59.747 45.652 99.542c0 .07-.005.139-.006.209h.006v56.025H110.648v-56.025h.006c0-.07-.006-.139-.006-.209c0-39.795 17.699-75.454 45.652-99.542c20.641-20.641 45.275-47.46 48.299-82.362c-3.024-34.902-27.659-61.721-48.299-82.362c-27.953-24.088-45.652-59.747-45.652-99.542V16.962h262.704V73.83c0 39.795-17.699 75.454-45.652 99.542z'
    />
    <path
      fill='#FFB636'
      d='M242 427.504c9.777 0 59.476 54.092 59.476 54.092H182.524s49.699-54.092 59.476-54.092zm-5.25-71.823a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm5.906 20.999a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm-14.31 35.251a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zm17.56-83.169a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811zM144.252 118.927c0 24.516 27.73 46.485 44.951 61.325c12.716 12.716 34.457 36.779 34.457 66.987c0 1.012.048 1.981.127 2.921c.639 24.677 3.799 52.197 11.638 62.017a5.906 5.906 0 1 0 10.373 2.621c10.525-6.473 14.175-40.104 14.515-69.728c1.8-25.503 22.332-52.666 34.484-64.818c17.221-14.84 44.951-36.808 44.951-61.325c0-11.927-195.496-11.927-195.496 0zm104.534 281.752a5.906 5.906 0 1 0 0 11.811a5.906 5.906 0 0 0 0-11.811z'
    />
    <path
      fill='#68442A'
      d='M373.353 31.627H110.648c-8.1 0-14.666-6.566-14.666-14.666s6.566-14.666 14.666-14.666h262.705c8.1 0 14.666 6.566 14.666 14.666s-6.567 14.666-14.666 14.666zm14.666 462.245c0-8.1-6.566-14.665-14.666-14.665H110.648c-8.1 0-14.666 6.565-14.666 14.665s6.566 14.665 14.666 14.665h262.705c8.099 0 14.666-6.565 14.666-14.665z'
    />
    <path
      fill='#FFD469'
      d='M339.748 115.432c0 9.076-43.763 16.434-97.748 16.434s-97.748-7.358-97.748-16.434S188.015 98.998 242 98.998s97.748 7.358 97.748 16.434z'
    />
  </svg>
)

const CountdownTimer = ({ timeInSeconds, extaTime, started }: ScoreBoardProps) => {
  const { setIsGameOver } = useAppContext()
  // State for the timer (in seconds)
  const [timeLeft, setTimeLeft] = useState(timeInSeconds) // 5 minutes = 300 seconds

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft || !started) return

    // Save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // Add timeLeft as a dependency to reset the interval
  }, [started, timeLeft])

  // Effect to add 2 extra minutes when addExtraTime changes
  useEffect(() => {
    if (extaTime) {
      setTimeLeft((prevTime) => prevTime + 120) // Add 120 seconds
    }
  }, [extaTime])

  // Convert timeLeft into minutes and seconds
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (timeLeft <= 0) {
    track('TaoshiEscape', { status: 'lost' })
    setIsGameOver(true)
  }

  return (
    <div className='text-lg font-medium flex gap-1 items-center -ml-[3px] pointer-events-none select-none'>
      {iconHourGlass} {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
    </div>
  )
}

export default CountdownTimer
