import React, { useEffect, useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import StudentHome from './pages/StudentHome'
import AuthForm from './pages/AuthForm'
import AttendenceTable from './pages/AttendenceTable'

const App = () => {
  const [auth,setAuth]=useState(false)
  useEffect(()=>{
     const token = localStorage.getItem("user_id")
     if(token){
      setAuth(true)
     }else{setAuth(false)}
  },[])
  return (
  <>
  {auth===true? 
  <>
  <Routes>
  <Route path='/' element={<StudentHome/>}/>
  {/* <Route path='/admin' element={<Home/>} /> */}
  <Route path='/admin' element={<Home/>} />
     <Route path='/attendence/table' element={<AttendenceTable/>} />

  </Routes>

  </>:<>
  <Routes>
     <Route path='/' element={<AuthForm/>} />
     <Route path='/admin' element={<Home/>} />
     <Route path='/attendence/table' element={<AttendenceTable/>} />

     
   </Routes>

  </>

  }
   
  </>
  )
}

export default App