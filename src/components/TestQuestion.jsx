import React from 'react'
import PropTypes from 'prop-types'


// MOCK:
// const answers = [
//   {
//     answerId: 'A',
//     answerText: 'option 1',
//     answerDescription: 'details about the option 1',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     answerId: 'B',
//     answerText: 'option 2',
//     answerDescription: 'long text example long text example long text example long text example long text example details about the option 2',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     answerId: 'C',
//     answerText: 'option 3',
//     answerDescription: '',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     answerId: 'D',
//     answerText: 'option 4',
//     answerDescription: 'details about the option 4',
//     imageUrl:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     answerId: 'E',
//     answerText: 'option 5',
//     answerDescription: 'details about the option 5',
//     imageUrl:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
// ]
// 
// const questionName = 'How do you say "Ahoj" in English'
// const questionDescription = 'Please anwer the question.'

export default function TestQuestion({ questionData, handleChangeAnswer, selectedAnswerId }) {
  return (
    <div className="max-w-md" >
      <h2 className="pl-16 pb-2 text-base font-semibold text-gray-900" >{questionData.questionName}</h2>
      <p className="pl-16 pb-3 text-sm text-gray-700" >{questionData.questionDescription}</p>
      <ul role="list" className="divide-y divide-gray-100">
        {questionData.answers.map((answer) => (
          <a 
            key={answer.answerId} 
            href='#' 
            onClick={() => {handleChangeAnswer(questionData.questionId, answer.answerId)}} className={`flex justify-between gap-x-6 py-2 ${
              selectedAnswerId === answer.answerId
                ? 'bg-indigo-600 text-white'
                : 'text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center min-w-0 gap-x-3">
              <div className="h-10 w-10 flex-none flex items-center justify-center text-xl font-bold text-gray-400" >{String.fromCharCode(answer.answerId + 64)}</div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">{answer.answerName}</p>
                <p className="truncate text-xs leading-5">{answer.answerDescription}</p>
              </div>
            </div>
          </a>
        ))}
      </ul>
    </div>
  )
}

TestQuestion.propTypes = {
  questionData: PropTypes.object.isRequired,
  handleChangeAnswer: PropTypes.func.isRequired,
  selectedAnswerId: PropTypes.number.isRequired,
}