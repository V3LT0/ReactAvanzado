import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './auth/context/AuthContext'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
