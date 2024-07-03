import React from 'react'
import PropTypes from 'prop-types'

export default function ButtonConfirm({ allQuestionsAnswered }) {
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

ButtonConfirm.propTypes = {
  allQuestionsAnswered: PropTypes.bool.isRequired,
}