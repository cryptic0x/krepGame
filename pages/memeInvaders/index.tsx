/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/media-has-caption */
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Seo from '../../components/scaffolding/Seo'
import Scoring from '../../components/Scoring'
import { getLocalStorageItem } from '../../utils/getLocalStorageItem'
import Navigation from '../../components/scaffolding/Navigation'
import ChooseCharacter from '../../components/memeInvaders/ChooseCharacter'

const MemeInvaders: NextPage = () => {
  const [view, setView] = useState('Running')
  const router = useRouter()
  const { theme, special } = router.query

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const intervalId = setInterval(async () => {
      const currentView = getLocalStorageItem('Meme Invaders', 'view')

      setView(currentView)
    }, 250)

    return () => clearInterval(intervalId)
  }, [view])

  useEffect(() => {
    // add gamescript
    const game = document.createElement('script')
    game.src = 'games/memeInvaders/scripts/game.js'
    game.type = 'module'
    game.async = false
    document.body.appendChild(game)
  }, [])

  const controlsButtonClasses =
    'rounded-full w-1/4 min-w-[100px] max-w-[150px] aspect-square bg-white bg-opacity-50 grid place-items-center text-[#000000] select-none pointer-events-auto'

  const player = theme || 'taoshi'

  let enemiesArray = []
  let hitEnemiesArray = []

  if (special === 'pizzaday') {
    for (let i = 0; i < 6; i++) {
      enemiesArray.push('pizza')
      hitEnemiesArray.push('pizza-hit')
    }
  } else {
    enemiesArray = ['doge', 'shiba-inu', 'pepe', 'floki', 'bonk', 'brett']
    hitEnemiesArray = ['doge-hit', 'shiba-inu-hit', 'pepe-hit', 'floki-hit', 'bonk-hit', 'brett-hit']
  }

  return (
    <>
      <Seo />
      <Scoring game='Meme Invaders' />
      <Navigation leaderboard='memeInvaders' />

      {!theme && <ChooseCharacter />}
      <main id='game-meme-invaders' className='grid h-dvh place-items-center overflow-hidden'>
        <div id='game-wrapper' className='relative'>
          {view !== 'Score' && (
            <div
              id='game-controls'
              className='justify-between fixed bottom-0 left-0 right-0 p-3 hidden pointer-events-none'
            >
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
            <div className='absolute inset-0 flex justify-center'>
              <div className='flex flex-col gap-5 pt-[130px]'>
                <button className='btn' type='button' onClick={() => window.location.reload()} autoFocus>
                  Play again
                </button>
              </div>
            </div>
          )}
          <canvas id='canvas' />
        </div>
      </main>
      <div id='game-assets' className='hidden'>
        <img data-asset='input' src='games/images/input-keyboard+space.png' alt='game-asset' />
        <img data-asset='input-touch' src='games/images/input-touch.png' alt='game-asset' />

        <img data-asset='background' src='games/memeInvaders/images/background.png' alt='game-asset' />

        {enemiesArray.map((enemy, index) => (
          <img
            key={index}
            data-asset={enemy}
            src={`games/memeInvaders/images/enemy/${special ? 'special/' : ''}${enemy}.png`}
            alt='game-asset'
          />
        ))}

        {hitEnemiesArray.map((enemy, index) => (
          <img key={index} data-asset={enemy} src={`games/memeInvaders/images/enemy/${enemy}.png`} alt='game-asset' />
        ))}

        <img data-asset='player-default' src={`games/memeInvaders/images/${player}/default.png`} alt='game-asset' />
        <img data-asset='player-armed' src={`games/memeInvaders/images/${player}/armed.png`} alt='game-asset' />
        <img data-asset='player-shoot' src={`games/memeInvaders/images/${player}/shoot.png`} alt='game-asset' />
        <img data-asset='player-dead' src={`games/memeInvaders/images/${player}/dead.png`} alt='game-asset' />
        <img data-asset='player-happy' src={`games/memeInvaders/images/${player}/happy.png`} alt='game-asset' />

        <audio data-asset='hit' src='games/memeInvaders/sounds/hit.wav' />
        <audio data-asset='dead' src='games/memeInvaders/sounds/dead.wav' />
        <audio data-asset='shoot' src='games/memeInvaders/sounds/shoot.wav' />
        <audio data-asset='lvlup' src='games/memeInvaders/sounds/lvlup.wav' />
        <audio data-asset='won' src='games/memeInvaders/sounds/won.wav' />
      </div>
    </>
  )
}

export default MemeInvaders
