/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const wrapListItems = (inputText: string): JSX.Element[] => {
  const lines = inputText.split('\n')
  const listItems: JSX.Element[] = lines.map((line, index) => {
    // Check if the line is a list item and remove the number and period or '>'
    const match = line.match(/^(\d+\.\s*|>\s*)(.*)$/)
    if (match) {
      // Use the index as a key for React elements
      return <li key={index}>{match[2]}</li>
    }
    // If it's not a list item, return the line as is, but not wrapped in <li>
    return <React.Fragment key={index}>{line}</React.Fragment>
  })

  return listItems
}

type FormatResultProps = {
  text: string
  animateText?: boolean
}

const FormatResult = ({ text, animateText }: FormatResultProps) => {
  // Function to wrap list items with <li></li> and return an array of JSX elements

  const listItems = wrapListItems(text)

  // Check if any of the elements are <li> tags
  const hasListItems = listItems.some((item) => item.type === 'li')

  // If there are list items, return them wrapped in <ul>, otherwise return the text as is
  return (
    <>
      {hasListItems ? (
        <ol className='mb-6'>{listItems}</ol>
      ) : (
        <p className='-mt-[5px]'>
          {animateText ? (
            <TypeAnimation
              sequence={[text, 1000]}
              splitter={(str) => str.split(/(?= )/)}
              speed={{ type: 'keyStrokeDelayInMs', value: 50 }}
              cursor={false}
            />
          ) : (
            text
          )}
        </p>
      )}
    </>
  )
}

export default FormatResult
