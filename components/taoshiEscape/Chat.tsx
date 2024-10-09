import React, { PropsWithChildren, useEffect, useRef } from 'react'

type ChatBoxProps = {
  className?: string
}

const ChatBox = ({ className, children }: PropsWithChildren<ChatBoxProps>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Create an invisible element at the end of the content
      const scrollEnd = document.createElement('div')
      scrollContainerRef.current.appendChild(scrollEnd)
      // Scroll the invisible element into view
      scrollEnd.scrollIntoView({ behavior: 'smooth' })
      // Remove the invisible element after scrolling
      scrollContainerRef.current.removeChild(scrollEnd)
    }
  }, [children])

  return (
    <div ref={scrollContainerRef} className={`overflow-y-auto ${className || className}`}>
      {children}
      <div ref={scrollContainerRef} />
    </div>
  )
}

export default ChatBox
