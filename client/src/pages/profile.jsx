import { Box, Typography, TextField } from '@mui/material'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
// import authApi from '../api/authApi'
import Avatar from '@mui/material/Avatar'
import blueGrey from '@mui/material/colors/blueGrey'

const profile = () => {
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
          disabled='true'
        />
        <Typography variant='body2' fontWeight='700'>

        </Typography>
        <Typography variant='body2' fontWeight='700'>
          PASSWORD
        </Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          // loading={loading}
        >
          CHANGE PASSWORD
        </LoadingButton>
      
      </Box>

    </>
  )
}

export default profile