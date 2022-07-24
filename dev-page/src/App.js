import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Screen from './Components/Screen';
import Buttons from './Components/Buttons';
import About from './Components/About';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import Contact from './Components/Contact';
import * as Tone from 'tone'

const notes = [
  'A3', 'A4', 'A5',
  'C#3', 'C#4', 'C#5',
  'D3', 'D4', 'D5',
  'A2', 'C#2', 'D2',
  'A1', 'C#1', 'D1',
  ]

function App() {

  // console.clear()

  const reverb = new Tone.Reverb(
    {
      wet: 1
    }
  ).toDestination()
  const organ = new Tone.MonoSynth().connect(reverb)

  const handleTone = () => {
    const rng = Math.floor(Math.random() * 15)
    organ.triggerAttackRelease(notes[rng], '2n')
  }

  const [display, setDisplay] = useState('none')
  const [visible, setVisible] = useState(<Screen onMouseOver={handleTone}/>)

  const handleButtonClick = (e) => {
    e.target.innerText === 'Contact' ?
    setDisplay('none') :
    setDisplay(e.target.innerText.toLowerCase())
  }

  useEffect(() => {
    display === 'screen' ?
    setVisible(<Screen onMouseOver={handleTone}/>) :
    display == 'about' ?
    setVisible(<About/>) :
    display == 'projects' ?
    setVisible(<Projects/>) :
    display == 'skills' ?
    setVisible(<Skills/>) :
    display === 'contact me' ?
    setVisible(<Contact/>) :
    console.log('hi')
  }, [display])

  return (
    <div className="App">
      <main className="base-frame">
        <Header />
          {visible}
        <Buttons onClick={handleButtonClick}/>
      </main>
    </div>
  );
}

export default App;
