import { Box, Typography, TextField } from '@mui/material'
import { useEffect,useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/authApi'
import Avatar from '@mui/material/Avatar'
import blueGrey from '@mui/material/colors/blueGrey'

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { userId } = useParams()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrText, setPasswordErrText] = useState('')
  console.log(userId);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await authApi.getOne(userId)
        setUsername(res.username)
        setEmail(res.email)
        setPassword(res.password)
      } catch (err) {
        alert(err)
      }
    }
    getProfile()
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPasswordErrText('')

    const data = new FormData(e.target)
    const username1 = username
    const password1 = password

    let err = false

    if (password === '') {
      err = true
      setPasswordErrText('Please fill this field')
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.updatePassword({ username1, password1 })
      setLoading(false)
      //localStorage.setItem('token', res.token)
      navigate('/')
    } catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'password') {
          setPasswordErrText(e.msg)
        }
      })
      setLoading(false)
    }
  }
  return (
    <>

      <Avatar sx={{ bgcolor: blueGrey[500] }} variant="square">
        P
      </Avatar>
      <Typography variant='body2' fontWeight='700'>

      </Typography>
      <Box

        component='form'
        sx={{ mt: 1 }}
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant='body2' fontWeight='700'>
          USERNAME
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          disabled='true'
          value={username}
        />
        <Typography variant='body2' fontWeight='700'>

        </Typography>
        <Typography variant='body2' fontWeight='700'>
          EMAIL
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          type='email'
          value={email}
          disabled={loading}
        />
        <Typography variant='body2' fontWeight='700'>

        </Typography>
        <Typography variant='body2' fontWeight='700'>
          PASSWORD
        </Typography>
        <TextField
          onChange={(newValue) => setPassword(newValue.target.value)}
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          value={password}
          error={passwordErrText !== ''}
          type={showPassword ? "text" : "password"}
        />
        <LoadingButton onClick={() => setShowPassword(s => !s)}>Show Password</LoadingButton>
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={loading}
        >
          CHANGE PASSWORD
        </LoadingButton>
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='error'
          loading={loading}
          onClick={() =>  navigate('/')}
        >
          CANCEL
        </LoadingButton>
      
      </Box>

    </>
  )
}
export default Profile