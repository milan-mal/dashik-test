import React from 'react'

export default function Spinner() {
  return(
    <div className="flex justify-center h-full">
      <div className="w-16 h-16 border-t-4 border-fuchsia-800 border-solid rounded-full animate-spin"></div>
    </div>
  )
}