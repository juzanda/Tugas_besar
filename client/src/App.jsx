import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './css/custom-scrollbar.css'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Board from './pages/Board'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import Profile from './pages/profile'
import Login from './pages/Login'



function App() {
  const theme = createTheme({
    palette: { mode: 'dark' }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgetPassword' element={<ForgetPassword />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='boards' element={<Home />} />
            <Route path='boards/:boardId' element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
