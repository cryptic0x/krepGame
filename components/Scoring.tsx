import React, { useEffect, useState } from 'react'
import { md5 } from 'js-md5'
import devtoolsDetect from 'devtools-detect'
import { isMobile } from 'react-device-detect'
import { getLocalStorageItem } from '../utils/getLocalStorageItem'
import { setLocalStorageItem } from '../utils/setLocalStorageItem'
import { getTimestamp } from '../utils/getTimestamp'

type ScoringoProps = {
  game: string
}

const DEFAULT_PLAYER = 'Unknown Player'

const Scoring = ({ game }: ScoringoProps) => {
  const [isCheating, setIsCheating] = useState(devtoolsDetect.isOpen)
  const [playerName, setPlayerName] = useState('')
  const [hasAddedHighScore, setHasAddedHighScore] = useState(false)
  const cheater = isCheating && !isMobile

  useEffect(() => {
    const player = localStorage.getItem('player') || DEFAULT_PLAYER
    setPlayerName(player)
    setLocalStorageItem(game, 'token', '')
  }, [game])

  useEffect(() => {
    const handleChange = (event: any) => {
      setIsCheating(event.detail.isOpen)
    }

    window.addEventListener('devtoolschange', handleChange)

    return () => {
      window.removeEventListener('devtoolschange', handleChange)
    }
  }, [])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!hasAddedHighScore) {
      const intervalId = setInterval(async () => {
        const timeStamp = getTimestamp()
        const token = md5(`${timeStamp}`)
        const check = getLocalStorageItem(game, 'token') || ''
        const view = getLocalStorageItem(game, 'view')

        if (cheater) {
          setLocalStorageItem(game, 'token', token)
        } else if (view === 'Score' && check === '') {
          setHasAddedHighScore(true)

          const score = getLocalStorageItem(game, 'score') || '0'
          const highScore = getLocalStorageItem(game, 'highScore') || '0'
          const player = playerName
          const correctedPlayer = player.replace(/^"|"$/g, '')

          if (Number(score) === Number(highScore) && Number(score) !== 0) {
            const device = isMobile ? 'mobile' : 'desktop'
            const api = '/api/add-highscore'
            const response = await fetch(api, {
              method: 'POST',
              body: JSON.stringify({ game: game, player: correctedPlayer, score: score, device: device, token: token }),
            })
            await response.json()
          }
        }
      }, 500)

      return () => clearInterval(intervalId)
    }
  }, [game, playerName, cheater, hasAddedHighScore])

  return <div />
}

export default Scoring
