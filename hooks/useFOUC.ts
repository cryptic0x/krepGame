import { useEffect } from 'react'

const useFOUC = () => {
  useEffect(() => {
    const { body } = document

    const timeoutId = setTimeout(() => {
      body.classList.remove('loading')
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  return null
}

export default useFOUC
