import { useContext } from 'react'
import './App.css'
import AuthContext from './service/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import ShopPage from './pages/ShopPage'
import Header from './components/Header'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

function App() {

  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<ShopPage />} />
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
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/login' element={<Navigate to={'/admin'} />} />
        </Routes >
      </div>
    )
  }

}

export default App
