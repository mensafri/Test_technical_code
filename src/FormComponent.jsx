import axios from 'axios'
import React from 'react'

export default function FormComponent() {
  const [inputValue, setInputValue] = React.useState('')
  const [triangle, setTriangle] = React.useState('')
  const [odds, setOdds] = React.useState('')
  const [primes, setPrimes] = React.useState('')

  const validateInput = (input) => {
    const num = parseInt(input, 10)
    return !isNaN(num) && num > 0
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleGenerateTriangle = async () => {
    if (!validateInput(inputValue)) {
      alert('Please enter a valid number')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/generate-triangle', { number: inputValue })
      console.log(response.data.triangle);
      setTriangle(response.data.triangle)
    } catch (error) {
      console.log('Error generating triangle', error)
    }
  }

  const handleGenerateOdds = async () => {
    if (!validateInput(inputValue)) {
      alert('Please enter a valid number')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/generate-odds', { number: inputValue })
      setOdds(response.data.odds)
    } catch (error) {
      console.log('Error generating odds', error)
    }
  }

  const handleGeneratePrimes = async () => {
    if (!validateInput(inputValue)) {
      alert('Please enter a valid number')
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/generate-primes', { number: inputValue })
      setPrimes(response.data.primes)
    } catch (error) {
      console.log('Error generating primes', error)
    }
  }

  const renderWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <div>
      <h1>Test Technical Code</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleGenerateTriangle}>Generate Triangle</button>
      <button onClick={handleGenerateOdds}>Generate Odds</button>
      <button onClick={handleGeneratePrimes}>Generate Primes</button>
      <div>
        <h2>Triangle</h2>
        <p>{renderWithLineBreaks(triangle)}</p>
      </div>
      <div>
        <h2>Odds</h2>
        <p>{odds}</p>
      </div>
      <div>
        <h2>Primes</h2>
        <p>{primes}</p>
      </div>
    </div>
  )
}
