import { useContext } from 'react'
import './App.css'
import AuthContext from './service/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import ShopPage from './pages/ShopPage'
import Header from './components/Header'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import LegalInfo from './pages/LegalInfo'
import Delivery from './pages/Delivery'
import About from './pages/About'

function App() {

  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<ShopPage />} />
          <Route path='/legal' element={<LegalInfo />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/about' element={<About />} />
          <Route path='/*' element={<Navigate to={'/'} replace />} />
          <Route path='/admin/login' element={<LoginPage />} />
          <Route path='/admin' element={<Navigate to={'/admin/login'} replace />} />
        </Routes >
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<ShopPage />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/about' element={<LegalInfo />} />
          <Route path='/legal' element={<About />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/login' element={<Navigate to={'/admin'} />} />
        </Routes >
      </div>
    )
  }

}

export default App
