import { createContext, useContext } from 'react'
import noop from 'lodash/fp/noop'

export type AppContextType = {
  isGameOver: boolean
  setIsGameOver: (toggle: boolean) => void
}

const defaultAppContext: AppContextType = {
  isGameOver: false,
  setIsGameOver: noop,
}

export const AppContext = createContext(defaultAppContext)

export const useAppContext = () => useContext(AppContext)
