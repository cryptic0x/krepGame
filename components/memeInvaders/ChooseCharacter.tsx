/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { trackOrLog } from '../../utils/trackOrLog'

const ChooseCharacter = () => {
  const router = useRouter()

  const [player, setPlayer] = useState('taoshi')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(any-hover: none)').matches)
  }, [])

  const handlePlayerSwitch = (image: string) => {
    setPlayer(image)
  }

  const handleReload = () => {
    router.replace({
      query: { ...router.query, theme: player },
    })
    trackOrLog({ message: 'MemeInvaders', key: 'character', value: player })

    setTimeout(() => {
      window.location.reload()
    }, 250)
  }

  const playerContainerClassNames = 'flex flex-col justify-center items-center gap-3 w-[80px] cursor-pointer'
  const playerContainerTextClassNames = 'text-white text-sm whitespace-nowrap'
  const playerContainerActiveImageClassNames = 'w-[70px] min-w-[70px] max-w-[70px] transition-all'
  const playerContainerInactiveImageClassNames = 'opacity-50 w-[50px] min-w-[50px] max-w-[50px] transition-all'

  const containerClassNames =
    'bg-black bg-opacity-60 backdrop-blur-sm border border-black flex items-center justify-center pointer-events-auto'
  const containerSizeClassNames = `${isMobile ? 'w-[374px] h-[564px]' : 'w-[780px] h-[580px]'}`

  type PlayerElementProps = {
    value: string
    label: string
    className?: string
  }

  const PlayerElement = ({ value, label, className }: PlayerElementProps) => (
    <div className={`${playerContainerClassNames} ${className || className}`} onClick={() => handlePlayerSwitch(value)}>
      <img
        src={`/games/memeInvaders/images/${value}/default.png`}
        className={`${player !== value ? playerContainerInactiveImageClassNames : playerContainerActiveImageClassNames}`}
        alt={`player_${value}`}
      />
      <div className={playerContainerTextClassNames}>{label}</div>
    </div>
  )

  const Players = () => (
    <>
      <PlayerElement value='taoshi' label='Mr. Taoshi' />
      <PlayerElement value='altcoinist' label='Altcoinist' />
      <PlayerElement value='dreadbongo' label='DreadBongo' />
      <PlayerElement value='calebsol' label='Calebsol' />
      <PlayerElement value='mogmachine' label='Mogmachine' />
    </>
  )

  return (
    <>
      <div className='fixed inset-0 z-50 grid place-items-center pointer-events-none'>
        <div className={`${containerClassNames} ${containerSizeClassNames}`}>
          <div className='flex flex-col items-center'>
            <div className='text-white text-center drop-shadow-md mb-5'>
              <div className='text-4xl font-bold'>Choose</div>
              <div className='text-lg font-medium'>your favorite influencer</div>
            </div>
            {isMobile ? (
              <div className='mb-8 h-[160px] w-[calc(100vw-2.5rem)] select-none overflow-x-scroll px-6'>
                <div className='flex gap-10 pl-10'>
                  <Players />
                  <div>
                    <div className='w-[50px]' />
                  </div>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-5 gap-5 mb-8 h-[160px]'>
                <Players />
              </div>
            )}

            <button className='btn' type='button' onClick={handleReload}>
              Start game
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChooseCharacter
