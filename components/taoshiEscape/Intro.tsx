import React from 'react'

type IntroProps = {
  questions: number
  countdown: number
}

const Intro = ({ questions, countdown }: IntroProps) => (
  <div className='max-w-[400px] min-w-[400px] w-full p-3 sm:p-10 hidden sm:block bg-gray-50 text-gray-900'>
    <b className='text-[20px]'>Welcome to Taoshi Escape</b>
    <p>
      <b>You embody Mr. Taoshi,</b> who finds himself in a locked room and you must navigate through the darkness and
      solve the puzzles 🧩 that stand between you and your freedom.
    </p>
    <p>
      <b>The clock is ticking</b> and on a table stands a glass containing a <b>deadly neurotoxin</b> 🧪 attatched to an
      explosive 💣 and a alarm clock set to release it in <b>{countdown} minutes.</b> ⏳
    </p>
    <p>
      <b>You have {questions} prompts to escape.</b> Each prompt you enter will use up one of your attempts as you
      interact with your environment, inspect items, and make critical decisions. 📋
    </p>
    <p>Choose wisely, as each move could lead you closer to escape or seal Mr. Taoshi‘s grim fate. 🙏🏻</p>
  </div>
)

export default Intro
