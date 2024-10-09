import './App.css';
import React from 'react';
import Typing from './Typing';

function App() {
  const [startGame, setStartGame] = React.useState(false)
  const [sentenceInfo, setSentenceInfo] = React.useState({'Length': 'Short', 'Font': 'Concert', 'Capitals': true})

  function handleOptionClick(type, change) {
    if (sentenceInfo.type !== change) {
      setSentenceInfo({
        ...sentenceInfo,
        [type]: change
      })
    }
  }
  function OptionsList() {

    return (
    <div className='optionsList'>
      <div className='optionsRow'>
      <h3>Text Length</h3>
      <div className='optionsContainer'>
        <div className={sentenceInfo.Length == 'Short' ? 'option chosen' : 'option'} onClick={() => handleOptionClick('Length', 'Short')}>
          Short
        </div>
        <div className={sentenceInfo.Length == 'Medium' ? 'option chosen' : 'option'} onClick={() => handleOptionClick('Length', 'Medium')}>
          Medium
        </div>
        <div className={sentenceInfo.Length == 'Long' ? 'option chosen' : 'option'} onClick={() => handleOptionClick('Length', 'Long')}>
          Long
        </div>
      </div>
      </div>
      <div className='optionsRow'>
      <h3>Font</h3>
      <div className='optionsContainer'>
        <div className={sentenceInfo.Font == 'Concert' ? 'option chosen' : 'option'} style={{fontFamily: 'Concert One'}} onClick={() => handleOptionClick('Font', 'Concert')}>
          Concert One
        </div>
        <div className={sentenceInfo.Font == 'Nunito' ? 'option chosen' : 'option'} style={{fontFamily: 'Nunito'}} onClick={() => handleOptionClick('Font', 'Nunito')}>
          Nunito
        </div>
        <div className={sentenceInfo.Font == 'Caveat' ? 'option chosen' : 'option'}  style={{fontFamily: 'Caveat'}} onClick={() => handleOptionClick('Font', 'Caveat')}>
         Caveat
        </div>
      </div>
      </div>
      <div className='optionsRow'>
      <h3>Capitals</h3>
      <div className='optionsContainer'>
        <div className={sentenceInfo.Capitals == true ? 'option chosen' : 'option'} onClick={() => handleOptionClick('Capitals', true)}>
          Yes
        </div>
        <div className={sentenceInfo.Capitals == false ? 'option chosen' : 'option'} onClick={() => handleOptionClick('Capitals', false)}>
          No
        </div>
      </div>
      </div>
    </div>
    )
  }

  function Options() {

    return (
      <div className='optionsBody'>
          <h1 className='title'>Typing Game</h1>
          <OptionsList />
          <button className='startButton' onClick={() => setStartGame(true)}>Start</button>
      </div>
    )
  }

  function back() {
    setStartGame(false)
  }

  return (
    <div className="App">
      <div className='box'>
        {startGame ? <Typing info={sentenceInfo} back={back}/> : <Options />}
      </div>
    </div>
  );
}

export default App;

