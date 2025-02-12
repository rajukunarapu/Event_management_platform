import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import SignIn from './Components/SignIn'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App