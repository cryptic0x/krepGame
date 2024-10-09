/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/media-has-caption */
import type { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import { md5 } from 'js-md5'

import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { Breakpoints } from '../../utils/breakpoints'
import { AppContext } from '../../components/taoshiEscape/AppContext'
import Seo from '../../components/scaffolding/Seo'
// import Scoring from '../../components/Scoring'
// import { getLocalStorageItem } from '../../utils/getLocalStorageItem'
// import Navigation from '../../components/scaffolding/Navigation'
import { getTimestamp } from '../../utils/getTimestamp'
import FormatText from '../../components/taoshiEscape/FormatText'
import ScoreBoard from '../../components/taoshiEscape/ScoreBoard'
import CountdownTimer from '../../components/taoshiEscape/CountdownTimer'
import Chat from '../../components/taoshiEscape/Chat'
import Intro from '../../components/taoshiEscape/Intro'
import { getDateFromTimestamp } from '../../utils/getDateFromTimestamp'
import Sound from '../../components/taoshiEscape/Sound'
import ClientOnly from '../../components/ClientOnly'
import Navigation from '../../components/scaffolding/Navigation'

// import ClientOnly from '../../components/ClientOnly'

const GAME_QUESTIONS = 10
const GAME_TIME = 600

const TaoshiEscape: NextPage = () => {
  const [isGameOver, setIsGameOver] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasFoundEasterEgg, setHasFoundEasterEgg] = useState(false)
  const [noMoreEasterEggs, setNoMoreEasterEggs] = useState(false)
  const [hasPrompted, setHasPrompted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)
  // const [init, setInit] = useState(true)
  const [prompt, setPrompt] = useState('')

  const [textResults, setTextResults] = useState<string[][]>([])
  const [imageResults, setImageResults] = useState<string[]>([])
  const [prompts, setPrompts] = useState<{ role: 'user'; content: string }[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const isMobile = useMediaQuery({ maxWidth: Breakpoints.md })

  const handleStartGame = () => {
    handleSendPrompt('')
    setHasStarted(true)
  }

  const handlePromptInput = (input: string) => {
    setPrompt(input)
  }

  const handleEnterPress = (event: { key: string }) => {
    // Check if the Enter key was pressed
    if (event.key === 'Enter' && prompt !== '') {
      // Call the function that you want to trigger on button click
      handleSendPrompt(prompt)
    }
  }

  const handleSendPrompt = (_prompt: string) => {
    const currentPrompt = _prompt || prompt

    const hasAnsweredBefore = textResults.length >= 1
    const lastAnswer = `LAST ANSWER: ${textResults[textResults.length - 1]}`

    setPrompts((oldArray) => [...oldArray, { role: 'user', content: currentPrompt }])
    setHasPrompted(true)
    setPrompt('')

    const currentPrompts = [
      ...prompts,
      { role: 'user', content: `PROMPT: ${currentPrompt}; ${hasAnsweredBefore ? lastAnswer : ''}` },
    ]

    const FetchText = async () => {
      const timeStamp = getTimestamp()
      const token = md5(`${timeStamp}`)

      try {
        const response = await fetch('/api/corcel/get-text', {
          method: 'POST',
          body: JSON.stringify({
            prompts: currentPrompts,
            token: token,
          }),
        })
        const responseData = await response.json()

        if (responseData === 'error') {
          setHasError(true)
        } else {
          const currentResult = responseData.data[0].choices[0].delta.content

          setTextResults((oldArray) => [...oldArray, [currentResult]])
          setHasPrompted(false)

          if (textResults.length >= 1) {
            FetchImage(
              `Imagine a male game character playing an escape room game in pixel art. He is in the following situation: ${currentResult}. The man is asking the following question: ${currentPrompt}`
            )
          }

          if (responseData.status === 'won') {
            setHasWon(true)
          } else if (responseData.status === 'lost') {
            setIsGameOver(true)
          } else if (responseData.status === 'easteregg' && !noMoreEasterEggs) {
            setHasFoundEasterEgg(true)
          }
        }
      } catch (fetchError: any) {
        if (fetchError.name === 'AbortError') {
          console.log('aborted')
        } else {
          setHasError(true)
        }
      }
    }

    const FetchImage = async (imagePrompt: string) => {
      const timeStamp = getTimestamp()
      const token = md5(`${timeStamp}`)

      try {
        const response = await fetch('/api/corcel/get-image', {
          method: 'POST',
          body: JSON.stringify({
            prompt: imagePrompt,
            token: token,
          }),
        })
        const responseData = await response.json()

        if (responseData === 'error') {
          setImageResults((oldArray) => [...oldArray, 'games/taoshiEscape/images/bulb.svg'])
        } else {
          setImageResults((oldArray) => [...oldArray, responseData])
        }
      } catch (fetchError: any) {
        setImageResults((oldArray) => [...oldArray, 'games/taoshiEscape/images/bulb.svg'])
      }
    }

    FetchText()
  }

  const chatClasses = `
    flex flex-col flex-auto
    p-3 sm:p-10 pt-0
    text-base sm:text-lg
  `

  return (
    <AppContext.Provider value={{ isGameOver, setIsGameOver }}>
      <Seo theme='#000000' image='share_taoshiEscape.png' />

      <main id='game-taoshi-escape' className='flex flex-1 text-gray-100'>
        <Intro questions={GAME_QUESTIONS} countdown={GAME_TIME / 60} />
        <div className='w-full bg-black relative'>
          <div className='flex flex-col h-dvh sm:max-w-[1000px] sm:mx-auto'>
            <AnimatePresence>
              {textResults.length > 0 && (
                <motion.div
                  animate={{ x: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                  }}
                  initial={{ x: -100 }}
                  className='flex items-end justify-between gap-2 px-3 sm:px-10 pb-[5px] h-[60px] sm:h-[82px]'
                >
                  <CountdownTimer
                    timeInSeconds={GAME_TIME}
                    extaTime={hasFoundEasterEgg}
                    started={prompts.length > 1 && !hasWon}
                  />
                  <ScoreBoard
                    allQuestions={GAME_QUESTIONS}
                    currentQuestion={textResults.length - 1}
                    isMinimal={isMobile}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!hasStarted && (
              <div className='absolute inset-0 grid place-items-center'>
                <div className='flex flex-col gap-2 items-center'>
                  <img src='/games/taoshiEscape/images/intro.png' alt='intro' className='max-w-[400px] w-full' />
                  <button type='button' className='bg-[#d56940] text-white py-2 px-3 rounded' onClick={handleStartGame}>
                    Escape now
                  </button>
                </div>
              </div>
            )}

            {isGameOver && (
              <div className='absolute inset-0 grid place-items-center bg-black bg-opacity-80 z-50 backdrop-blur-sm'>
                <div className='flex flex-col items-center gap-5'>
                  <div className='relative'>
                    <img src='games/taoshiEscape/images/tombstone.svg' alt='tombstone' className='w-[150px]' />
                    <div className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 whitespace-nowrap text-center'>
                      <div>Mr. TAOSHI</div>
                      <div>{getDateFromTimestamp(Date.now())}</div>
                    </div>
                  </div>
                  <div className='max-w-[300px] text-center mb-2'>
                    <div className='uppercase text-2xl font-bold mb-2'>You lost</div>
                  </div>
                  <button
                    type='button'
                    className='bg-[#d56940] text-white py-2 px-3 rounded'
                    onClick={() => window.location.reload()}
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {hasWon && (
              <div className='absolute inset-0 grid place-items-center bg-black bg-opacity-80 z-50 backdrop-blur-sm'>
                <div className='flex flex-col items-center gap-5'>
                  <img src='games/taoshiEscape/images/trophy.svg' alt='trophy' className='w-[150px]' />
                  <div className='max-w-[300px] text-center mb-2'>
                    <div className='uppercase text-2xl font-bold mb-2'>You did it!</div>
                    <div className='text-lg leading-6'>Mr. TAOSHI escaped and can focus on pushin TAO again.</div>
                  </div>
                  <button
                    type='button'
                    className='bg-[#d56940] text-white py-2 px-3 rounded'
                    onClick={() => window.location.reload()}
                  >
                    Play again
                  </button>
                </div>
              </div>
            )}

            {hasFoundEasterEgg && !noMoreEasterEggs && (
              <div className='absolute inset-0 grid place-items-center bg-black bg-opacity-80 z-50 backdrop-blur-sm'>
                <div className='flex flex-col items-center gap-5'>
                  <img src='games/taoshiEscape/images/easter_egg.svg' alt='easter_egg' className='w-[150px]' />
                  <div className='max-w-[300px] text-center mb-2'>
                    <div className='uppercase text-2xl font-bold mb-2'>Easter Egg found!</div>
                    <div className='text-lg leading-6'>Warren Robinett will be proud!</div>
                  </div>
                  <button
                    type='button'
                    className='bg-[#d56940] text-white py-2 px-3 rounded'
                    onClick={() => {
                      setHasFoundEasterEgg(false)
                      setNoMoreEasterEggs(true)
                    }}
                  >
                    2 extra minutes!
                  </button>
                </div>
              </div>
            )}

            {hasPrompted && (
              <div className='absolute inset-0 grid place-items-center bg-black bg-opacity-50 z-50'>
                <img src='games/taoshiEscape/images/loader.svg' alt='loader' className='w-[50px]' />
              </div>
            )}

            {hasError && (
              <div className='absolute inset-0 grid place-items-center bg-black bg-opacity-80 z-50'>
                <div className='flex flex-col items-center gap-5'>
                  <div className='max-w-[300px] text-center mb-2'>
                    <div className='uppercase text-2xl font-bold mb-2'>Opppps</div>
                    <div className='text-lg leading-6'>Something went wrong</div>
                  </div>
                  <button
                    type='button'
                    className='bg-[#d56940] text-white py-2 px-3 rounded'
                    onClick={() => window.location.reload()}
                  >
                    Reload page
                  </button>
                </div>
              </div>
            )}

            <Chat className={chatClasses}>
              {textResults.map((answer, answerIndex) => (
                <div key={answerIndex} className=''>
                  {prompts.map(
                    (promptText, promptTextIndex) =>
                      promptTextIndex === answerIndex &&
                      answerIndex > 0 && (
                        <div key={promptTextIndex} className='mb-6 flex flex-col gap-1'>
                          <div
                            className='border border-dashed border-gray-500 px-4 py-3 rounded-lg rounded-br-none text-right text-gray-400 text-xl font-hand uppercase'
                            key={promptTextIndex}
                          >
                            {promptText.content}
                          </div>
                          <div className='text-right text-xs text-gray-400'>
                            Mr. Taoshi‘s escape attempt {promptTextIndex} of {GAME_QUESTIONS}
                          </div>
                        </div>
                      )
                  )}
                  {answer.map((anserText, anserTextIndex) => (
                    <motion.div
                      className=''
                      key={anserTextIndex}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                      }}
                      initial={{ opacity: 0 }}
                    >
                      <div className='flex gap-5'>
                        {answerIndex - 1 >= 0 && anserTextIndex === 0 && (
                          <div className='mb-5'>
                            <div className=' min-w-[80px] w-[80px] rounded bg-gray-900 aspect-square grid place-items-center'>
                              <img
                                className='corcel'
                                src={
                                  imageResults[answerIndex - 1]
                                    ? imageResults[answerIndex - 1]
                                    : '/games/taoshiEscape/images/loader.svg'
                                }
                              />
                            </div>
                          </div>
                        )}
                        <FormatText text={anserText as string} animateText={answerIndex === 0} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </Chat>

            {hasStarted && !hasPrompted && (
              <div className='flex px-2 pb-3 sm:px-10 sm:pb-10'>
                <input
                  type='text'
                  className={`flex-1 p-3 sm:p-5 outline-none rounded-lg text-gray-900 ${prompt !== '' ? 'rounded-r-none' : ''}`}
                  placeholder='What would you like to do?'
                  value={prompt}
                  onChange={(e) => handlePromptInput(e.target.value)}
                  onKeyDown={handleEnterPress}
                  ref={inputRef}
                />
                {prompt !== '' && (
                  <button
                    type='button'
                    className='bg-[#d56940] text-white py-3 px-4 sm:px-5 sm:py-5 rounded-r-lg'
                    onClick={() => handleSendPrompt(prompt)}
                    disabled={prompt === ''}
                  >
                    Send
                  </button>
                )}
              </div>
            )}

            {hasStarted && (
              <div className='relative h-[40px] mx-3 sm:mx-10'>
                <Navigation position='bottom' alignment='left' theme='dark' hideLeaderboard hideName />
                <ClientOnly>
                  <Sound color='text-white' className='absolute bottom-[5px] right-[5px] z-20' />
                </ClientOnly>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppContext.Provider>
  )
}

export default TaoshiEscape
