/* eslint-disable jsx-a11y/media-has-caption */
import type { NextPage } from 'next'
import React, { useEffect } from 'react'

import Seo from '../../components/scaffolding/Seo'

import Scoring from '../../components/Scoring'
import Navigation from '../../components/scaffolding/Navigation'

const FlappyTaoshi: NextPage = () => {
  useEffect(() => {
    // add gamescript
    const game = document.createElement('script')
    game.src = 'games/flappyTaoshi/scripts/game.js'
    game.type = 'module'
    game.async = false
    document.body.appendChild(game)
  }, [])

  return (
    <>
      <Seo />
      <Scoring game='Flappy Taoshi' />
      <Navigation leaderboard='flappyTaoshi' />

      <main id='game-flappy-taoshi' className='grid h-dvh place-items-center overflow-hidden'>
        <div id='game-wrapper' className='relative'>
          <canvas id='canvas' />
        </div>
      </main>

      <div id='game-assets' className='hidden'>
        <img data-asset='input-touch' src='games/images/input-touch.png' alt='game-asset' />
        <img data-asset='input-mouse' src='games/images/input-mouse.png' alt='game-asset' />

        <img data-asset='group' src='games/flappyTaoshi/images/group.png' alt='game-asset' />
        <img data-asset='bird' src='games/flappyTaoshi/images/bird.png' alt='game-asset' />
        <img data-asset='bird-flap' src='games/flappyTaoshi/images/bird-flap.png' alt='game-asset' />
        <img data-asset='bird-hurt' src='games/flappyTaoshi/images/bird-hurt.png' alt='game-asset' />
        <img data-asset='pipe-top' src='games/flappyTaoshi/images/pipe-top.png' alt='game-asset' />
        <img data-asset='pipe-bottom' src='games/flappyTaoshi/images/pipe-bottom.png' alt='game-asset' />
        <img data-asset='background' src='games/flappyTaoshi/images/background-day.png' alt='game-asset' />
        <img data-asset='clouds' src='games/flappyTaoshi/images/background-cloud.png' alt='game-asset' />
        <img data-asset='ground' src='games/flappyTaoshi/images/ground.png' alt='game-asset' />
        <img data-asset='frame' src='games/images/scoreboard.png' alt='game-asset' />
        <img data-asset='placeholder' src='games/flappyTaoshi/images/placeholder.png' alt='game-asset' />

        <audio data-asset='hit' src='games/flappyTaoshi/sounds/hit.wav' />
        <audio data-asset='die' src='games/flappyTaoshi/sounds/die.wav' />
        <audio data-asset='point' src='games/flappyTaoshi/sounds/point.wav' />
        <audio data-asset='wing' src='games/flappyTaoshi/sounds/wing.wav' />
        <audio data-asset='retrosynth' loop src='games/sounds/retrosynth.wav' />
      </div>
    </>
  )
}

export default FlappyTaoshi
