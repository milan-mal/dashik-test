import React, { useState, useEffect, useRef, useCallback } from 'react'
import testService from '../../services/tests'
import TestQuestion from '../TestQuestion'
import Pagination from '../Pagination'
import Spinner from '../ui_components/Spinner'
import ButtonConfirm from '../ui_components/ButtonConfirm'

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('selectedAnswers')
    return savedAnswers ? JSON.parse(savedAnswers) : []
  })
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)
  const scrollPositionRef = useRef(null)

  const initialTestId = '653c1b5d9043071e5085d008'

  useEffect(() => {
    // TODO: remove from useEffect
    setTimeout(() => {
      testService
        .getTest(initialTestId)
        .then(fetchedTest => {
          setCurrentTest(fetchedTest)
          setQuestionCount(Object.keys(fetchedTest.questions).length)
        }
        )
    }, 1500)
  }, [])
  
  useEffect(() => {
    if (scrollPositionRef.current !== null) {
      requestAnimationFrame(() => {
        console.log('Restoring scroll position to:', scrollPositionRef.current)
        window.scrollTo(0, scrollPositionRef.current)
        // Reset after scrolling
        scrollPositionRef.current = null
      })
    }

    // TODO: remove from useEffect
    // Check if all questions are answered whenever selectedAnswers or currentQuestionIndex changes
    const answeredQuestionsCount = Object.keys(selectedAnswers).length
    setAllQuestionsAnswered(answeredQuestionsCount === questionCount)
  }, [currentQuestionIndex, selectedAnswers, questionCount])

  useEffect(() => {
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
  }, [selectedAnswers])

  const getCurrentQuestion = () => {
    if( currentTest.questions ){
      const currentQuestion = currentTest.questions[currentQuestionIndex]
      
      // Find the selected answer for the current question
      const selectedAnswer = selectedAnswers.find(
        answer => answer.questionId === currentQuestion.questionId
      )
      console.log('currentQuestion.questionId', currentQuestion.questionId)
      console.log('selectedAnswer', selectedAnswer)
      // Get the answerId if a selected answer exists, otherwise undefined
      const selectedAnswerId = selectedAnswer ? selectedAnswer.selectedAnswerId : undefined
      console.log('selectedAnswerId', selectedAnswerId)

      return (
        <>
          <Pagination questionCount={questionCount} currentQuestionIndex={currentQuestionIndex} handleChangeQuestion={handleChangeQuestion} />
          <TestQuestion questionData={currentQuestion} handleChangeAnswer={handleChangeAnswer} selectedAnswerId={selectedAnswerId} />
          <ButtonConfirm allQuestionsAnswered={allQuestionsAnswered} />
        </>
      )
    } else {
      return <Spinner />
    }
  }

  const handleChangeQuestion = (newQuestionIndex) => {
    scrollPositionRef.current = window.scrollY
    console.log('Captured scroll position before changing question:', scrollPositionRef.current)
    
    setCurrentQuestionIndex(newQuestionIndex)
  }

  const handleChangeAnswer = useCallback((questionId, selectedAnswerId) => {
    scrollPositionRef.current = window.scrollY
    console.log('Captured scroll position before changing answer:', scrollPositionRef.current)
    
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers.filter(
        answer => answer.questionId !== questionId
      )
      updatedAnswers.push({ questionId, selectedAnswerId })
      return updatedAnswers
    })
  }, [])
  
  console.log('--- TestPage rendered ---')
  console.log('selectedAnswers', JSON.stringify(selectedAnswers))
  
  return (
    <div className="bg-white w-full">
      <div className="w-full flex flex-row justify-center relative isolate p-6 pt-14 lg:px-20">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="w-full flex flex-col">
          <h1 className='px-6 sm:py-3 sm:pt-12 lg:py-6 lg:pt-16'>{currentTest.testName}</h1>
          <div className='w-full flex flex-row sm:py-5 lg:py-10 divide-x divide-gray-700'>
            <div className='grow basis-1 px-6'>
              <h2 className='pb-4'>Text headline for the text</h2>
              <p className='text-sm'>Text relevant to the test questions goes here.</p>
            </div>
            <div className='grow basis-1 px-6'>
              {getCurrentQuestion()}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}