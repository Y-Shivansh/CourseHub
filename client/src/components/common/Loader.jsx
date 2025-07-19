import React from 'react'

const Loader = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 text-primary-light dark:text-secondary-light bg-background-light/60 dark:bg-background-dark/60'>
        <div className='animate-ping rounded-full h-12 w-12 border-t-4 border-b-4 border-primary'></div>
    </div>
  )
}

export default Loader
