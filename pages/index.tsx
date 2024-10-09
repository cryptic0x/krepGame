/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/no-autofocus */
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import Seo from '../components/scaffolding/Seo'
import Navigation from '../components/scaffolding/Navigation'

const DEFAULT_PLAYER = 'Unknown Player'

const IndexPage: NextPage = () => {
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    const player = localStorage.getItem('player') || DEFAULT_PLAYER
    setPlayerName(player)
  }, [])

  const handlePlayerName = (name: string) => {
    setPlayerName(name)
    localStorage.setItem('player', name)
  }

  const handleFocus = (event: { target: { select: () => any } }) => event.target.select()

  return (
    <>
      <Seo />
      <Navigation />

      <main className='grid h-screen place-items-center'>
        <div className='flex flex-col gap-7'>
          <div>
            <label className='block mb-2 text-2xl font-medium text-gray-900 text-center'>Player Name</label>
            <input
              type='text'
              onChange={(e) => handlePlayerName(e.target.value)}
              onFocus={handleFocus}
              value={playerName}
              maxLength={20}
              className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base outline-none'
            />
          </div>
          <div>
            <label className='block text-2xl font-medium text-gray-900 text-center mb-5'>Krepsta Games</label>
            <div className='flex justify-center flex-wrap gap-10 max-w-[300px]'>
              <a href='/flappyTaoshi' target='_self'>
                <img
                  src='/games/images/game_flappy_taoshi.webp'
                  alt='game_flappy_taoshi'
                  className='hover:scale-105 transition-all w-[120px]'
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default IndexPage
