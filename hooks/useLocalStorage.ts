import { useState } from 'react'

const useLocalStorage = (key: string, initialValue: any) => {
  // eslint-disable-next-line consistent-return
  const [state, setState] = useState(() => {
    // Initialize the state
    if (!global?.window) return null
    try {
      const value = window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      // console.log(error)
    }
  })

  // eslint-disable-next-line consistent-return
  const setValue = (value: (arg0: any) => any) => {
    if (!global?.window) return null
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      // console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage
