/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { getDateFromTimestamp } from '../utils/getDateFromTimestamp'
import Seo from '../components/scaffolding/Seo'
import Navigation from '../components/scaffolding/Navigation'
import ClientOnly from '../components/ClientOnly'

const options = [
  { value: 'flappyTaoshi', label: 'Flappy Krep' },
]

const Leaderboard: NextPage = () => {
  const router = useRouter()
  const ppp = router.query.ppp || 15
  const game = router.query.game || 'flappyTaoshi'

  const [highscores, setHighscores] = useState([] as any)
  const [selectedOption, setSelectedOption] = useState({ value: '', label: '' })
  const [sortBy, setSortBy] = useState('score')

  const onChange = (option: any) => {
    setSelectedOption(option)
    router.query.game = option.value
    router.push(router)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (game === 'flappyTaoshi') {
        setSelectedOption({ value: 'flappyTaoshi', label: 'Flappy Krep' })
      } else if (game === 'taoshiJump') {
        setSelectedOption({ value: 'taoshiJump', label: 'Taoshi Jump' })
      } else if (game === 'memeInvaders') {
        setSelectedOption({ value: 'memeInvaders', label: 'Meme Invaders' })
      }
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [game])

  useEffect(() => {
    if (game) {
      const FetchData = async () => {
        try {
          const response = await fetch(`/api/get-highscores?game=${selectedOption.label}`)
          const responseData = await response.json()

          const { rows } = responseData.scores

          setHighscores(rows)
        } catch (fetchError: any) {
          console.log('error')
        }
      }

      FetchData()
    }
  }, [selectedOption])

  const tableHeadClasses = 'py-3 px-1.5'
  const tableCellClasses = 'py-3 px-1.5'
  const linkClasses = 'underline underline-offset-2 hover:no-underline'

  const iconMobile = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
      />
    </svg>
  )

  const iconDesktop = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
      />
    </svg>
  )

  const iconShare = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-5 h-5'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
      />
    </svg>
  )

  const handleSortedBy = (sortListBy: string) => {
    if (sortListBy === 'score') {
      setSortBy('timestamp')
    } else {
      setSortBy('score')
    }
  }

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
  const sortByTimestamp = (array: any[]) => array.sort((a, b) => parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10))

  const sortedHighscoresByScore = sortByScore(filterByLargestScore(highscores))
  const sortedHighscoresByTimestamp = sortByTimestamp(filterByLargestScore(highscores))
  const highscoreList = sortBy === 'score' ? sortedHighscoresByScore : sortedHighscoresByTimestamp

  const getIndexIcon = (place: number) => {
    if (sortBy === 'score') {
      if (place === 1) {
        return '🥇'
      }
      if (place === 2) {
        return '🥈'
      }
      if (place === 3) {
        return '🥉'
      }
    }
    return String(place)
  }

  const xUrl = 'https://twitter.com/intent/tweet'
  const shareUrl = 'https://gamehub.taoshi.ai/share'
  const shareText = `Have a look at my high score on ${selectedOption.label}! Think you can beat me? Bring it on! 🎮🏆`
  const shareHashtags = '#MemeCoin #SolanaGamefi #TaoshiHighScoreChallenge'

  return (
    <>
      <Seo />
      <Navigation />

      <main className='flex h-dvh justify-center'>
        <div className='relative rounded w-full max-w-3xl pt-20 pb-10 px-4'>
          <div className='mb-5 flex items-center flex-col'>
            <div className='text-xl w-[250px] mb-3'>
              <ClientOnly>
                {selectedOption.value && (
                  <Select
                    defaultValue={selectedOption}
                    onChange={onChange}
                    options={options}
                    placeholder='Select Game'
                  />
                )}
              </ClientOnly>
            </div>
            <div className='text-center'>
              Showing the{' '}
              <span
                className={`${linkClasses} ${sortBy === 'timestamp' ? 'underline cursor-pointer' : 'no-underline font-bold'}`}
                onClick={() => handleSortedBy('timestamp')}
              >
                best
              </span>{' '}
              /{' '}
              <span
                className={`${linkClasses} ${sortBy === 'score' ? 'underline cursor-pointer' : 'no-underline font-bold'}`}
                onClick={() => handleSortedBy('score')}
              >
                newest
              </span>{' '}
              {ppp} of {highscores.length} players
            </div>
          </div>
          <div className='overflow-hidden rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 mb-10'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className={`pl-3 ${tableHeadClasses}`}>
                    #
                  </th>
                  <th scope='col' className={tableHeadClasses}>
                    Score
                  </th>
                  <th scope='col' className={tableHeadClasses}>
                    Player
                  </th>
                  <th scope='col' className={tableHeadClasses} />
                  <th scope='col' className={tableHeadClasses} />
                  <th scope='col' className={`pr-3 ${tableHeadClasses}`} />
                </tr>
              </thead>
              <tbody>
                {highscoreList.map(
                  (highscore, index) =>
                    index < Number(ppp) && (
                      <tr className='bg-white border-b' key={index}>
                        <td className={`pl-3 ${tableCellClasses}`}>{getIndexIcon(index + 1)}</td>
                        <td className={tableCellClasses}>
                          <div className='text-ellipsis overflow-hidden max-w-[60px]'>
                            <b>{highscore.score}</b>
                          </div>
                        </td>
                        <td className={`w-full ${tableCellClasses}`}>
                          <div className='text-ellipsis overflow-hidden max-w-[250px]'>{highscore.player}</div>
                        </td>
                        <td className={tableCellClasses}>
                          <a
                            href={`${xUrl}?text=${encodeURIComponent(shareText)}%0a%0a${shareUrl}?share=${highscore.timestamp}%26game=${selectedOption.value}%0a%0a${encodeURIComponent(shareHashtags)}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {iconShare}
                          </a>
                        </td>
                        <td className={tableCellClasses}>
                          {highscore.device !== 'unknown'
                            ? highscore.device === 'mobile'
                              ? iconMobile
                              : iconDesktop
                            : ''}
                        </td>
                        <td
                          className={`pr-3 whitespace-nowrap ${tableCellClasses}`}
                        >{`${getDateFromTimestamp(Number(highscore.timestamp))}`}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default Leaderboard
