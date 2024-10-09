/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/media-has-caption */
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Seo from '../../components/scaffolding/Seo'
import Scoring from '../../components/Scoring'
import { getLocalStorageItem } from '../../utils/getLocalStorageItem'
import Navigation from '../../components/scaffolding/Navigation'

const FlappyTaoshi: NextPage = () => {
  const [view, setView] = useState('Running')

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const intervalId = setInterval(async () => {
      const currentView = getLocalStorageItem('Taoshi Jump', 'view')

      setView(currentView)
    }, 250)

    return () => clearInterval(intervalId)
  }, [view])

  useEffect(() => {
    // add gamescript
    const game = document.createElement('script')
    game.src = 'games/taoshiJump/scripts/game.js'
    game.type = 'module'
    game.async = false
    document.body.appendChild(game)
  }, [])

  const controlsButtonClasses =
    'rounded-full w-1/4 min-w-[100px] max-w-[150px] aspect-square bg-white bg-opacity-50 grid place-items-center text-[#e48638] select-none'

  return (
    <>
      <Seo />
      <Scoring game='Taoshi Jump' />
      <Navigation leaderboard='taoshiJump' />

      <main id='game-taoshi-jump' className='grid h-dvh place-items-center overflow-hidden'>
        <div id='game-wrapper'>
          {view === 'Running' && (
            <div id='game-controls' className='justify-between fixed bottom-0 left-0 right-0 p-3 hidden'>
              <div id='game-controls-left' className={controlsButtonClasses}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-20 h-20'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </div>

              <div id='game-controls-right' className={controlsButtonClasses}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-20 h-20'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
              </div>
            </div>
          )}
          {view === 'Score' && (
            <div className='absolute inset-0 grid place-items-center'>
              <div className='pt-[150px] flex flex-col gap-5'>
                <button className='btn' type='button' onClick={() => window.location.reload()} autoFocus>
                  Play again
                </button>
                {/* <Link href='/leaderboard?game=Taoshi&20Jump'>
                  <button className='btn' type='button'>
                    Leaderboard
                  </button>
                </Link> */}
              </div>
            </div>
          )}
          <canvas id='canvas' />
        </div>
      </main>

      <div id='game-assets' className='hidden'>
        <img data-asset='input-touch' src='games/images/input-touch.png' alt='game-asset' />
        <img data-asset='input-keyboard' src='games/images/input-keyboard.png' alt='game-asset' />

        <img data-asset='platform' src='games/taoshiJump/images/platform.png' alt='game-asset' />
        <img data-asset='taoshi-left' src='games/taoshiJump/images/taoshiLeft.png' alt='game-asset' />
        <img data-asset='taoshi-right' src='games/taoshiJump/images/taoshiRight.png' alt='game-asset' />
        <img data-asset='frame' src='games/images/scoreboard.png' alt='game-asset' />
        <img data-asset='clouds' src='games/taoshiJump/images/clouds.png' alt='game-asset' />
        <img data-asset='ground' src='games/taoshiJump/images/ground.png' alt='game-asset' />
        <img data-asset='bird-left' src='games/taoshiJump/images/birdLeft.png' alt='game-asset' />
        <img data-asset='bird-right' src='games/taoshiJump/images/birdRight.png' alt='game-asset' />

        <audio data-asset='hit' src='games/taoshiJump/sounds/hit.wav' />
        <audio data-asset='die' src='games/taoshiJump/sounds/die.wav' />
        <audio data-asset='point' src='games/taoshiJump/sounds/point.wav' />
        <audio data-asset='jump' src='games/taoshiJump/sounds/jump.wav' />
        <audio data-asset='multicoin' src='games/taoshiJump/sounds/multicoin.wav' />
        <audio data-asset='retrosynth' loop src='games/sounds/retrosynth.wav' />
      </div>
    </>
  )
}

export default FlappyTaoshi
