'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'

const ClientOnly = ({ children }: PropsWithChildren) => {
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return clientReady ? <>{children}</> : null
}

export default ClientOnly
