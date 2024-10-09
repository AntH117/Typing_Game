import './Typing.css';
import React from 'react';
import Sentences from './sentenceList';
export default function Typing({info, back}) {
  const [wordIndex, setWordIndex] = React.useState(0)
  const [sentence, setSentence] = React.useState(generateSentence(info))
  const [lastInput, setLastInput] = React.useState('')
  const [start, setStart] = React.useState(false)
  const [end, setEnd] = React.useState(false)
  const [WPM, setWPM] = React.useState(0);
  const myTimer = React.useRef(null);
  const currentLetter = sentence[wordIndex]

  function generateSentence(information) {
    const lengths = information.Length
    const sentences = Sentences[lengths]
    const random = Math.floor(Math.random() * sentences.length)
    let finalSentence = sentences[random]
    const capitals = information.Capitals
    if (!capitals) {
      finalSentence = finalSentence.toLowerCase()
    }
    return finalSentence
  }
  React.useEffect(() => {
      const handleKeyDown = (event) => {
        const { key } = event;
        const { keyCode } = event;
        if (keyCode > 64 && keyCode < 91 || keyCode == 49 || keyCode == 191  || keyCode == 190 || keyCode == 222 || keyCode == 188 || keyCode == 189) {
            setLastInput(key[0])
            if (key[0] == currentLetter) {
              setWordIndex(preVal => preVal += 1)
            }
        } else if (keyCode == 32 && currentLetter == ' ') {
          setLastInput('Space')
          setWordIndex(preVal => preVal += 1)
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
  }, [wordIndex]);
  //Timer
  class Timer {
    constructor() {
      this.startTime = null;
      this.endTime = null;
    }
  
    start() {
      this.startTime = new Date();
    }
  
    stop() {
      this.endTime = new Date();
      const elapsedTime = (this.endTime - this.startTime) / 1000; // Convert to seconds
      return elapsedTime;
    }
  
    reset() {
      this.startTime = null;
      this.endTime = null;
    }
  }

  React.useEffect(() => {
    myTimer.current = new Timer()
  }, [])
  console.log(end)
  React.useEffect(() => {
    if (wordIndex == 1) {
      myTimer.current.start()
      setStart(true)
    } else if (wordIndex == sentence.length) {
      const endTime = myTimer.current.stop()
      setEnd(true)
      setWPM(Math.floor((sentence.length / endTime)* 60))
    }
  }, [wordIndex])
  function CorrectWord() {
    const correctLetters = sentence.slice(0, wordIndex)
    const remainingLetters = sentence.slice(wordIndex + 1)
    return <div className='sentences' style={{fontFamily: info.Font}}>
      <a><span className='correctLetters'>{correctLetters}</span><span className='currentLetter'>{currentLetter}</span><span>{remainingLetters}</span></a>
    </div>
  }
  return (
    <div className='typingBody'>
      {end ? (<div className='WPM' style={{fontFamily: info.Font}}>
        Words per Minute: {WPM}
      </div>) : null}
      <div className='correctText'>
        <CorrectWord />
      </div>
      <div className='buttonContainer'>
        <button onClick={() => {
            myTimer.current.reset();
            setWordIndex(0);
            setEnd(false)
          }}>
            Reset
        </button>
        <button onClick={() => {back(); myTimer.current.reset(); setEnd(false); setWordIndex(0);}}>
        Back 
        </button>
      </div>
      <p className='startTag'>{start ? '' : <p>Timer begins when you start typing</p>}</p>

    </div>
  )
}