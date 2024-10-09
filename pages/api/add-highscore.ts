/* eslint-disable max-len */
import { sql } from '@vercel/postgres'
import { createRouter } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { md5 } from 'js-md5'
import { track } from '@vercel/analytics/server'
import { getTimestamp } from '../../utils/getTimestamp'

const router = createRouter<NextApiRequest, NextApiResponse>()

// eslint-disable-next-line consistent-return
router.post(async (request, response) => {
  const body = JSON.parse(request.body)

  // security check
  const { token } = body
  const timeStampA = getTimestamp()
  const timeStampB = getTimestamp(-1)
  const timeStampC = getTimestamp(1)
  const securityTokenA = md5(`${timeStampA}`)
  const securityTokenB = md5(`${timeStampB}`)
  const securityTokenC = md5(`${timeStampC}`)

  const tracking = {
    game: body.game as string,
    player: body.player as string,
    score: body.score as string,
    device: body.device as string,
    token: token as string,
    securityTokenA: securityTokenA as string,
    securityTokenB: securityTokenB as string,
    securityTokenC: securityTokenC as string,
  }

  if (securityTokenA === token || securityTokenB === token || securityTokenC === token) {
    try {
      if (!body.player || !body.score) throw new Error('Player and Score required')

      await sql`INSERT INTO Highscores (Game, Player, Score, Device, Timestamp) VALUES (${body.game as string}, ${body.player as string}, ${body.score as string}, ${body.device as string}, ${Date.now()})`

      await track('Highscore addded', tracking)

      return response.status(200).json({
        message: 'Highscore addded',
      })
    } catch (error) {
      return response.status(500).json({ error })
    }
  } else {
    await track('Not allowed', tracking)

    return response.status(500).json({ error: 'Not allowed' })
  }
})

export default router.handler()

export const config = {
  maxDuration: 45,
  api: {
    externalResolver: true,
  },
}
