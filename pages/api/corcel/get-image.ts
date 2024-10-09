import { md5 } from 'js-md5'
import { getTimestamp } from '../../../utils/getTimestamp'

export default async function handler(req: any, res: any) {
  const body = JSON.parse(req.body)

  // security check
  const { token } = body
  const timeStampA = getTimestamp()
  const timeStampB = getTimestamp(-1)
  const timeStampC = getTimestamp(1)
  const securityTokenA = md5(`${timeStampA}`)
  const securityTokenB = md5(`${timeStampB}`)
  const securityTokenC = md5(`${timeStampC}`)

  if (securityTokenA === token || securityTokenB === token || securityTokenC === token) {
    const remoteServerUrl = 'https://api.corcel.io/v1/image/vision/text-to-image'

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.CORCEL_API_KEY as string,
      },
      body: JSON.stringify({
        cfg_scale: 2,
        steps: 8,
        engine: 'stable-diffusion-xl-turbo',
        height: 1024,
        width: 1024,
        text_prompts: [
          {
            text: body.prompt,
            weight: 1,
          },
        ],
      }),
    }

    const response = await fetch(remoteServerUrl, options)
    const data = await response.json()

    if (response.status === 200) {
      res.status(200).json(data.signed_urls[0])
    } else {
      res.status(200).json('error')
    }
  } else {
    res.send({ error: 'Not allowed' })
  }
}
