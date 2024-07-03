import React from 'react'

const page = () => {
  return (
    <div style={{minHeight:'50vh'}} className='d-flex flex-column justify-content-center h-100'>
    <div className='alert alert-danger text-center w-100'>
        The resource you are looking for does not exist or do not have permission to access it.
    </div>
    </div>
  )
}

export default page