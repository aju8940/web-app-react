import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Pages/User/Dashboard'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import AdminLogin from './Pages/Admin/adminLogin'
import AdminHome from './Pages/Admin/adminHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/admin/login' element={<AdminLogin/>} />
            <Route path='/admin' element={<AdminHome/>} />
          </Routes>
        </div>

      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
