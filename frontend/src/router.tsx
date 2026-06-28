import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import History from './pages/History.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Profile from './pages/Profile.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'history', element: <History /> },
      {  path: 'login', element: <Login /> },
      {  path: 'register', element: <Register /> },
      {  path: 'profile', element: <Profile /> },
    ]
  }
])
