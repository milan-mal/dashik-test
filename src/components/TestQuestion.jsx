import React from 'react'
import PropTypes from 'prop-types'

const answers = [
  {
    answerId: 'A',
    answerText: 'option 1',
    answerDescription: 'details about the option 1',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    answerId: 'B',
    answerText: 'option 2',
    answerDescription: 'long text example long text example long text example long text example long text example details about the option 2',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    answerId: 'C',
    answerText: 'option 3',
    answerDescription: '',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    answerId: 'D',
    answerText: 'option 4',
    answerDescription: 'details about the option 4',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    answerId: 'E',
    answerText: 'option 5',
    answerDescription: 'details about the option 5',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

// MOCK:
// const questionName = 'How do you say "Ahoj" in English'
// const questionDescription = 'Please anwer the question.'

/**
 * Represents a single question with answers in a test.
 * @param {string} {questionData} // TODO: probably needs to be changed to an "question object"
 * @returns {any}
 */
export default function TestQuestion({ questionData }) {
  return (
    <div className="max-w-md" >
      <h2 className="pl-16 pb-2 text-base font-semibold text-gray-900" >{questionData.questionName}</h2>
      <p className="pl-16 pb-3 text-sm text-gray-700" >{questionData.questionDescription}</p>
      <ul role="list" className="divide-y divide-gray-100">
        {answers.map((answer) => (
          <li key={answer.answerDescription} className="flex justify-between gap-x-6 py-2">
            <div className="flex items-center min-w-0 gap-x-3">
              <div className="h-10 w-10 flex-none flex items-center justify-center text-xl font-bold text-gray-500" >{answer.answerId}</div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{answer.answerText}</p>
                <p className="truncate text-xs leading-5 text-gray-700">{answer.answerDescription}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

TestQuestion.propTypes = {
  questionData: PropTypes.string,
}

// TestQuestion.propTypes = {
//   questionData: React.ReactPropTypes.string.isRequired,
// }