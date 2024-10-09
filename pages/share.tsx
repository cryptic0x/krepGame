/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Seo from '../components/scaffolding/Seo'

const Share: NextPage = () => {
  const router = useRouter()

  const { game } = router.query
  const { share } = router.query

  const [highscores, setHighscores] = useState([] as any)
  const [highscoreGame, setHighscoreGame] = useState('Taoshi Jump')

  useEffect(() => {
    if (game) {
      let apiGame = ''

      if (game === 'flappyTaoshi') {
        apiGame = 'Flappy Taoshi'
      } else if (game === 'taoshiJump') {
        apiGame = 'Taoshi Jump'
      } else if (game === 'memeInvaders') {
        apiGame = 'Meme Invaders'
      }

      setHighscoreGame(apiGame)

      const FetchData = async () => {
        try {
          const response = await fetch(`/api/get-highscores?game=${apiGame}`)
          const responseData = await response.json()

          const { rows } = responseData.scores

          setHighscores(rows)
        } catch (fetchError: any) {
          console.log('error')
        }
      }

      FetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  const iconTrophy = (
    <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 512 512'>
      <path
        fill='#E2A042'
        d='M382.287 464.724c-6.201-6.996-13.561-12.868-21.523-14.416c0-.05.008-.099.008-.15c0-12.345-10.007-22.353-22.353-22.353H174.136c-12.345 0-22.353 10.007-22.353 22.353c0 .05.007.099.008.15c-7.962 1.548-15.322 7.42-21.523 14.416c-10.236 11.548-2.011 29.778 13.421 29.778h225.178c15.431 0 23.656-18.23 13.42-29.778z'
      />
      <path
        fill='#FFB636'
        d='M493.587 86.056c-11.911-14.232-29.387-22.395-47.946-22.395h-24.134V34.59H91.047v29.071H66.359c-18.559 0-36.034 8.162-47.945 22.395c-11.911 14.232-16.868 32.872-13.597 51.141l19.321 107.935c5.342 29.843 31.224 51.504 61.542 51.504h77.056c2.194 0 4.371-.123 6.528-.348c9.869 11.219 20.411 22.255 31.474 33.319c8.042 8.042 15.26 14.671 21.947 19.899a556.241 556.241 0 0 1-6.27 27.387l-2.902 11.009c-1.044 3.631-1.945 7.205-3.046 10.663c-1.151 3.458-2.722 6.801-4.468 9.971c-1.761 3.17-3.609 6.167-5.117 8.934a74.18 74.18 0 0 0-3.749 7.551c-.44 1.124-.906 2.176-1.212 3.149c-.295.973-.502 1.866-.577 2.673c-.374 3.228.868 5.072.868 5.072c6.216 9.245 16.262 17.142 29.488 22.184c33.012 12.583 73.333 2.651 90.06-22.184c0 0 1.242-1.844.868-5.072c-.075-.807-.282-1.7-.577-2.673c-.305-.973-.772-2.025-1.212-3.149a74.18 74.18 0 0 0-3.749-7.551c-1.508-2.767-3.356-5.764-5.117-8.934c-1.746-3.17-3.318-6.513-4.468-9.971c-1.101-3.458-2.001-7.032-3.046-10.663l-2.902-11.009a557.4 557.4 0 0 1-6.192-26.997c6.828-5.287 14.207-12.045 22.451-20.289c11.05-11.05 21.579-22.072 31.437-33.276a62.8 62.8 0 0 0 6.01.305h77.057c30.317 0 56.199-21.66 61.543-51.505l19.319-107.934c3.271-18.268-1.685-36.909-13.595-51.141zM85.68 254.037a19.902 19.902 0 0 1-19.61-16.412L46.748 129.691c-1.426-7.97 2.102-13.631 4.333-16.296s7.181-7.136 15.278-7.136h24.713c.639 60.152 17.88 106.563 45.375 147.778H85.68zm379.571-124.346l-19.319 107.934a19.905 19.905 0 0 1-19.611 16.413h-50.213c27.495-41.215 44.737-87.626 45.375-147.778h24.159c8.096 0 13.047 4.471 15.278 7.136c2.23 2.664 5.757 8.325 4.331 16.295z'
      />
      <path
        fill='#E2A042'
        d='M133.385 491.285C146.858 504.758 199.197 510 256.277 510s115.373-10.86 124.535-20.022s-51.063-9.408-51.063-9.408l-196.364 10.715z'
      />
      <ellipse cx='256' cy='34.59' fill='#FFD469' rx='165.068' ry='28.143' />
      <path
        fill='#FFD469'
        d='M366.507 191.449c-1.965 0-3.962-.353-5.906-1.099c-8.508-3.263-12.76-12.806-9.496-21.314c12.218-31.855 11.069-50.287 9.854-69.8c-.567-9.095 6.347-16.928 15.441-17.495c9.113-.564 16.928 6.348 17.494 15.442c1.593 25.56 1.723 47.95-11.979 83.67c-2.518 6.565-8.774 10.596-15.408 10.596z'
      />
    </svg>
  )

  type PlayerInfo = {
    player: string
    score: string // Score is a string that represents a number
    device: string
    timestamp: string
  }

  const filterByLargestScore = (players: PlayerInfo[]): PlayerInfo[] => {
    const playerScores: Record<string, PlayerInfo> = {}

    players.forEach((player) => {
      const scoreAsNumber = parseInt(player.score, 10)

      if (!playerScores[player.player] || scoreAsNumber > parseInt(playerScores[player.player].score, 10)) {
        playerScores[player.player] = { ...player, score: player.score }
      }
    })

    // Convert to array
    return Object.values(playerScores)
  }

  const sortByScore = (array: any[]) => array.sort((a, b) => parseInt(b.score, 10) - parseInt(a.score, 10))
  const sortedHighscoresByScore = sortByScore(filterByLargestScore(highscores))
  const highscoreList = sortedHighscoresByScore

  const linkClasses = 'underline underline-offset-2 hover:no-underline'

  return (
    <>
      <Seo image='https://gamehub.taoshi.ai/share_score.png' />

      <main className='grid h-dvh place-items-center'>
        <div>
          <div className='bg-white rounded-lg p-10 flex flex-col items-center min-w-[350px]'>
            <div className='-mt-20 mb-5'>{iconTrophy}</div>
            {highscoreList.map(
              (highscore: { player: string; score: string; timestamp: string }, index: number) =>
                highscore.timestamp === share && (
                  <div className='text-center' key={index}>
                    <div className='text-3xl'>{highscore.player}</div>
                    <div className='mt-3'>
                      has a high score of <b>{highscore.score}</b>
                    </div>
                    <div>and is ranked</div>
                    <div className='text-8xl my-3'>
                      <b>{index + 1}</b>
                    </div>
                    <div>
                      out of <b className='text-xl'>{highscores.length}</b> players
                    </div>
                    <div>
                      {' '}
                      on{' '}
                      <a href={`/${game}`} className={linkClasses}>
                        <b>{highscoreGame}!</b>
                      </a>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className='text-center mt-4 text-sm'>
            Taoshi{' '}
            <a href='https://www.krepsta.com/' className={linkClasses}>
              Website
            </a>{' '}
            <a href='https://krepgames.com' className={linkClasses}>
              Gamehub
            </a>{' '}
            <a href='https://x.com/krepstaonkas' className={linkClasses}>
              X Profile
            </a>
          </div>{' '}
        </div>
      </main>
    </>
  )
}

export default Share
