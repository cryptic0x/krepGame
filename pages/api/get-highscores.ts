import { sql } from '@vercel/postgres'
import { createRouter } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (request, response) => {
  const { game } = request.query

  const scores = await sql`
    SELECT player, score, timestamp, device, game
    FROM Highscores
    WHERE game = ${game as string}
  `
  return response.status(200).json({ scores })
})

export default router.handler()

export const config = {
  maxDuration: 45,
  api: {
    externalResolver: true,
  },
}
