import React from 'react'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import useFOUC from '../hooks/useFOUC'
import '../styles/app.scss'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {useFOUC()}
    <Component {...pageProps} />
    <Analytics />
  </>
)

export default App
