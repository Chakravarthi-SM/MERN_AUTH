import React from 'react'

const VerifyEmail = () => {
  return (
    <div className='relative w-full h-[760px] overflow-hidden'>
      <div className='min-h-screen flex items-center justify-center  px-4'>
        <div className='rounded-lg shadow-2xl p-10 bg-white w-full max-w-md text-center'>
            <h2 className='text-2xl font-semibold text-green-700 mb-4'>✅ Check Your Email</h2>
            <p className='text-black text-base font-normal'>
                We've sent you an email to verify your account. Please check your inbox and click the verification link
            </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail