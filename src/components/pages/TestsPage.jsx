import React from 'react'
import { useState, useEffect } from 'react'
import TestQuestion from '../TestQuestion'
import testService from '../../services/tests'

export default function TestsPage() {
  const [currentTest, setCurrentTest] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const initialTestId = '653c1b5d9043071e5085d008'

  useEffect(() => {
    testService
      .getTest(initialTestId)
      .then(fetchedTest => setCurrentTest(fetchedTest))
  }, [])

  const currentQuestion = currentTest.questions[currentQuestionIndex]
  console.log('currentQuestion', currentQuestion)

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
              <TestQuestion questionData={currentQuestion} />
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