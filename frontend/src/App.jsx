import React,{useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'

const App = () => {
  // const [loading, setloading] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App