import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/signUp' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App