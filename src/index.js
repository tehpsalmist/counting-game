import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const faces = ['😁', '😂', '😇', '😚', '🤓', '🥳', '🤪', '🥶', '🤥', '🥰', '😡', '🤡', '🤠', '🤑', '😸', '🤖', '🎃', '🦷', '👶🏻', '👶🏿', '🧙🏻‍♂️', '🎅🏼', '🦋', '🦊', '🦄', '🐨', '🐸', '🐼', '🐵', '🐣', '🦉', '🦇', '🐛', '🐙', '🦞', '🦐', '🐍', '🐢', '🦖', '🐇', '🦚', '🐩', '🦜', '🐿', '🦕']

const getAnswer = () => Math.ceil(Math.random() * 20)
const getFace = () => faces[Math.floor(Math.random() * faces.length)]

export const App = props => {
  const [guess, setGuess] = useState('')
  const [answer, setAnswer] = useState(getAnswer())
  const [currentFace, setCurrentFace] = useState(getFace())
  const [results, setResults] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const submitGuess = e => {
    e.preventDefault()
    if (!answer) return

    setResults([...results, answer === Number(guess) ? '✅' : '🚫'])
    setAnswer(getAnswer())
    setCurrentFace(getFace())
    setGuess('')
  }

  const reset = () => {
    setAnswer(getAnswer())
    setCurrentFace(getFace())
    setGuess('')
    setResults([])
  }

  useEffect(() => {
    setGameOver(results.length >= 10)
  }, [results])

  return <main className='h-screen flex flex-col items-center justify-center md:justify-evenly bg-green-200'>
    <h1 className='text-center text-3xl'>Counting Game!</h1>
    {gameOver
      ? <>
        <h2 className='text-5xl'>Great Job!</h2>
        <div style={{ fontSize: '100px' }}>{'🥳'}</div>
      </>
      : <>
        <div className='text-3xl md:text-5xl flex justify-evenly flex-wrap'>
          {Array.from({ length: answer }, () => currentFace)
            .map((face, key) => <div key={key} className='mx-2'>{face}</div>)}
        </div>
        <form onSubmit={submitGuess}>
          <input
            className='outline-none bg-orange-200 text-blue-500 text-5xl text-center w-48'
            type='number'
            value={guess}
            onChange={e => setGuess(e.target.value)}
          />
        </form>
      </>}
    <div className='flex flex-wrap justify-evenly text-xl md:text-5xl'>
      {results.map((result, key) => <div key={key} className='mx-2'>{result}</div>)}
    </div>
    {gameOver && <button
      className='p-3 bg-blue-500 text-white rounded shadow-md'
      onClick={() => reset()}
    >
      Play Again 🔄
    </button>}
  </main>
}

render(<App />, document.getElementById('app'))
