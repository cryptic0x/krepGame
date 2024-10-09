import { track } from '@vercel/analytics'

const env = process.env.NODE_ENV

type trackOrLogProps = {
  message: string
  key?: string
  value?: string
}

export const trackOrLog = ({ message, key, value }: trackOrLogProps) => {
  if (env === 'production') {
    if (key && value) {
      track(message, { key: value })
    } else {
      track(message)
    }
  } else if (key && value) {
    console.log(message, { key: value })
  } else {
    console.log(message)
  }
}
