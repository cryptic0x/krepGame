/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

type FormatTextProps = {
  text: string
  animateText?: boolean
}

const FormatText = ({ text, animateText }: FormatTextProps) => {
  const sourceText = text
  const textWithoutLineBreaks = sourceText.replace(/\n\n/g, ' ')
  const modifiedText = textWithoutLineBreaks

  return (
    <p className='-mt-[5px] font-hand'>
      {animateText ? (
        <TypeAnimation
          sequence={[modifiedText, 1000]}
          splitter={(str) => str.split(/(?= )/)}
          speed={{ type: 'keyStrokeDelayInMs', value: 50 }}
          cursor={false}
        />
      ) : (
        modifiedText
      )}
    </p>
  )
}

export default FormatText
