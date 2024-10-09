/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-no-useless-fragment */
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type NavigationProps = {
  hide?: boolean
  leaderboard?: string
  position?: 'top' | 'bottom'
  alignment?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  hideLeaderboard?: boolean
  hideName?: boolean
}

const btnClasses = 'py-2 text-center leading-4 flex gap-1 items-center'
const btnActiveClasses = 'pointer-events-none underline'

const Navigation = ({
  hide,
  leaderboard,
  position = 'top',
  theme = 'light',
  alignment = 'center',
  hideLeaderboard,
  hideName,
}: NavigationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playerName, setPlayerName] = useState('')

  const router = useRouter()
  const { pathname } = router

  const isRoot = pathname === '/'
  const isLeaderboard = pathname === '/leaderboard'
  const isMemeInvaders = pathname === '/memeInvaders'

  const memeInvadersTheme = router.query.theme

  useEffect(() => {
    const player = localStorage.getItem('player')
    setPlayerName(player as string)
  }, [])

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          animate={{ y: 0 }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
          }}
          initial={{ y: -100 }}
          className={`
            flex items-center justify-${alignment} min-h-[40px]
            ${position === 'top' ? 'fixed top-0 left-0 right-0 z-50' : ''}
            ${theme === 'light' ? 'bg-white' : 'bg-black'}
          `}
        >
          <div className='flex gap-2 items-center'>
            <a href='/' className={`${btnClasses} ${isRoot ? btnActiveClasses : ''}`}>
              {!isRoot && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                </svg>
              )}
              All games
            </a>
            {!hideLeaderboard && (
              <>
                <span className='text-gray-300'>|</span>
                <a
                  href={`/leaderboard?game=${leaderboard || 'flappyTaoshi'}`}
                  className={`${btnClasses} ${isLeaderboard ? btnActiveClasses : ''}`}
                >
                  Best players
                </a>
              </>
            )}

            {!isRoot && !isLeaderboard && !playerName && !hideName && (
              <>
                <span className='text-gray-300'>|</span>
                <a href='/' className={`${btnClasses} ${isRoot ? btnActiveClasses : ''}`}>
                  Change name
                </a>
              </>
            )}

            {isMemeInvaders && memeInvadersTheme && (
              <>
                <span className='text-gray-300'>|</span>
                <a href='/memeInvaders' className={`${btnClasses} ${isRoot ? btnActiveClasses : ''}`}>
                  Change character
                </a>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Navigation
