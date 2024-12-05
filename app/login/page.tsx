import React from 'react'
import LoginForm from './login'
import { cookies } from 'next/headers'

const page = async() => {

  return (
    <LoginForm/>
  )
}

export default page