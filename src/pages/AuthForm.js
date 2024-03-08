import React, { useState } from 'react'
import Login from '../component/Login'
import Register from '../component/Register'

const AuthForm = () => {
    const [auth,setAuth]=useState(true)
  return (
    <div className='w-[100%] h-[100vh] bg_login'>
    <div className='flex justify-center items-center w-[100%] h-[100%]'>
       <div className=''>
       {auth ? <Login setAuth={setAuth}/>:<Register setAuth={setAuth}/>

       }
       
       
       </div>
    </div>

   </div>
  )
}

export default AuthForm