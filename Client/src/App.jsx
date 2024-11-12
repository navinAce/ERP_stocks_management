import './App.css'
import { Navbar } from './component/Navbar.jsx'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default App
