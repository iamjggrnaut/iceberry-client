import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './service/AuthContext.jsx'

import { Provider } from 'react-redux';
import store from './redux/store.js'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
