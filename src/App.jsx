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
import Contact from './pages/Contact'
import Footer from './components/Footer'
import PaymentDetails from './pages/PaymentDetails'

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
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<Navigate to={'/'} replace />} />
          <Route path='/payment-details' element={<PaymentDetails />} />
          <Route path='/admin/login' element={<LoginPage />} />
          <Route path='/admin' element={<Navigate to={'/admin/login'} replace />} />
        </Routes >
        <Footer />
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
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/legal' element={<LegalInfo />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/payment-details' element={<PaymentDetails/>} />
          <Route path='/admin/login' element={<Navigate to={'/admin'} />} />
        </Routes >
        <Footer />
      </div>
    )
  }

}

export default App
