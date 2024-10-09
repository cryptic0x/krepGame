import React from 'react'
import { useAppContext } from './AppContext'

type ScoreBoardProps = {
  allQuestions: number
  currentQuestion: number
  isMinimal?: boolean
}

const numberClasses =
  'w-[30px] aspect-square rounded-full grid place-items-center text-gray-900 pointer-events-none select-none'
const activeNumberClasses = 'bg-[#ca7047]'
const inactiveNumberClasses = 'bg-[#e5b07a] opacity-50'

const ScoreBoard = ({ allQuestions, currentQuestion, isMinimal }: ScoreBoardProps) => {
  const { setIsGameOver } = useAppContext()

  if (currentQuestion === allQuestions) setIsGameOver(true)

  return (
    <div className='flex items-center gap-2'>
      {isMinimal
        ? currentQuestion > 0 && (
            <>
              <div className={`${numberClasses} ${activeNumberClasses}`}>{currentQuestion}</div>
              <span>of {allQuestions}</span>
            </>
          )
        : [...Array(allQuestions)].map((_question, index) => (
            <div
              className={`${numberClasses} ${index < currentQuestion ? activeNumberClasses : inactiveNumberClasses}`}
              key={index}
            >
              {index + 1}
            </div>
          ))}
    </div>
  )
}

export default ScoreBoard
