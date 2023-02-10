import "./index.css"
import Die from "./components/Die"
import {useEffect, useState} from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice,setDice] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === dice[0].value)
    if(allHeld && allSame) {
      setTenzies(true)
    }
  },[dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value:Math.ceil(Math.random() * 6),
      isHeld:false
    }
  }

  function allNewDice() {
    const newArray = []
    for(let i=0;i<10;i++) {
      newArray.push(
        generateNewDie()
      )
    }
    return newArray
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
          die :
          generateNewDie()
    }))
  }
  
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id===id ? 
      {...die,isHeld: !die.isHeld}: die
    }))
  }

  function newGame() {
    setTenzies(false)
    setDice(allNewDice())
  }

  const displayDice = dice.map(die=> <Die key={die.id} value={die.value} dieheld={die.isHeld} hold={() => holdDice(die.id)} />)
  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dieholder">
        {displayDice}
      </div>
      <button 
        className="roll-dice" 
        onClick={tenzies? newGame: rollDice}>{tenzies?"New Game":"Roll"}
      </button>
    </main>
  )
}