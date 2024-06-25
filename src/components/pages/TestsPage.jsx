import React from 'react'
import { useState, useEffect } from 'react'
import TestQuestion from '../TestQuestion'
import testService from '../../services/tests'
import Pagination from '../Pagination'

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})  //TODO: change to localStorage
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

  const initialTestId = '653c1b5d9043071e5085d008'

  useEffect(() => {
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
    // Check if all questions are answered whenever selectedAnswers or currentQuestionIndex changes
    const answeredQuestionsCount = Object.keys(selectedAnswers).length
    setAllQuestionsAnswered(answeredQuestionsCount === questionCount)
  }, [selectedAnswers, questionCount])

  function Spinner() {
    return(
      <div className="flex justify-center h-full">
        <div className="w-16 h-16 border-t-4 border-fuchsia-800 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  const ButtonConfirm = () => {
    return(
      <div className='w-full grid justify-center p-10' >
        <button
          type='button'
          onClick={() => {}}
          className='px-4 py-2 rounded-md border border-solid border-gray-200 bg-white text-indigo-600 font-semibold leading-5
          hover:bg-indigo-600 hover:text-white disabled:text-gray-500 disabled:bg-gray-100'
          disabled={!allQuestionsAnswered}
        >Confirm my answers</button>
      </div>
    )
  }

  const getCurrentQuestion = () => {
    if( currentTest.questions ){
      const currentQuestion = currentTest.questions[currentQuestionIndex]
      return (
        <>
          <Pagination questionCount={questionCount} currentQuestionIndex={currentQuestionIndex} handleChangeQuestion={handleChangeQuestion} />
          <TestQuestion questionData={currentQuestion} handleChangeAnswer={handleChangeAnswer} selectedAnswerId={selectedAnswers[currentQuestion.questionId]} />
          <ButtonConfirm />
        </>
      )
    } else {
      return <Spinner />
    }
  }

  const handleChangeQuestion = (newQuestionIndex) => {
    setCurrentQuestionIndex(newQuestionIndex)
  }

  const handleChangeAnswer = (selectedQuestionId, selectedAnswerId) => {
    selectedAnswers[selectedQuestionId] = selectedAnswerId
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers, [selectedQuestionId]: selectedAnswerId,
    }))
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers))
    console.log('selectedAnswers', JSON.stringify(selectedAnswers))
  }
  
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