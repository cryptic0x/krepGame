import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import Loader from '../components/Loader'

const App = () => (
  <Html lang='en'>
    <Head />
    <body className='loading'>
      <Loader />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default App
