import React, {useState, useEffect} from 'react'
import './TypingBox.css'

const TypingBox = () => {
  const [typedKeys, setTypedKeys] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [totalKeysPressed, setTotalKeysPressed] = useState(0)
  const [accuracySet, setAccuracy] = useState(100)
  const [elapsedTime, setElapsedTime] = useState(0)

  const calculateAccuracy = keysPressed => {
    const expectedKeys = 'asdfjkl;'
    let accuracySet = 100

    for (let i = 0; i < keysPressed; i++) {
      if (typedKeys[i] !== expectedKeys[i]) {
        accuracySet = ((i + 1) / keysPressed) * 100
        break
      }
    }

    return accuracySet.toFixed(2)
  }

  const calculateStatistics = () => {
    const keysPressed = typedKeys.length
    setTotalKeysPressed(keysPressed)
    setAccuracy(calculateAccuracy(keysPressed))
  }

  useEffect(() => {
    setStartTime(Date.now())

    const timer = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000)
    }, 1000)

    return () => {
      setEndTime(Date.now())
      clearInterval(timer)
      calculateStatistics()
    }
  }, [typedKeys, startTime])

  const handleInputChange = event => {
    const {value} = event.target
    setTypedKeys(value)
    setTotalKeysPressed(value.length)
  }

  return (
    <div className="typing-box-container">
      <input
        type="text"
        className="typing-input"
        value={typedKeys}
        onChange={handleInputChange}
        autoFocus
      />
      <div className="statistics-container">
        <p className="statistics-label">Keys Pressed:</p>
        <p className="statistics-value">{totalKeysPressed}</p>
        <p className="statistics-label">Accuracy:</p>
        <p className="statistics-value">{accuracySet}%</p>
        <p className="statistics-label">Elapsed Time:</p>
        <p className="statistics-value">{elapsedTime.toFixed(2)}s</p>
      </div>
    </div>
  )
}

export default TypingBox
