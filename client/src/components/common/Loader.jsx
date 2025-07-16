import React from 'react'

const Loader = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 text-primary-light dark:text-secondary-light bg-background-light/80 dark:bg-background-dark/80'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary'></div>
    </div>
  )
}

export default Loader
