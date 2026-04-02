import React from 'react'

function FrequentQuestions({question, answer}) {
  return (
    <div>
      <div>
        <h1>{question}</h1>
        <span>+</span>
      </div>
      <p>{answer}</p>
    </div>
  )
}

export default FrequentQuestions
