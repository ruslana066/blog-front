import React from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import avatar from '../img/avatar.jpg'
import { useRegisterUserMutation } from '../services/authApi';
import { setAuthState } from '../redux/slices/authSlice';


const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [redisterUser, {data, error}] = useRegisterUserMutation()

  const {
    register, handleSubmit, setError, formState: { errors, isValid }
  } = useForm({
    deafultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    let fullName = values.fullName
    let email = values.email
    let password = values.password

    const userCredentials = {
      fullName, email, password
    }

    const responce = await redisterUser(userCredentials)
    dispatch(setAuthState({isLoggedIn: true, data: {...responce.data}}))

    if(responce.data.token) {
      window.localStorage.setItem('token', responce.data.token)
    } else {
      return alert('register failed')
    }

    // console.log(responce)

    navigate('/')
  }

  return (
    <div className='register'>
      <h2 className='register-title' >Log In</h2>
      <img src={avatar} alt="" />
      <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Full Name" error={Boolean(errors.fullName?.message)} helperText={Boolean(errors.fullName?.message)} fullWidth className='field'
          {...register('fullName', { required: 'put correct' })}
        />
        <TextField label="Email" error={Boolean(errors.email?.message)} helperText={Boolean(errors.email?.message)} fullWidth className='field'
          {...register('email', { required: 'put correct' })}
        />
        <TextField label="Password" error={Boolean(errors.password?.message)} helperText={Boolean(errors.password?.message)} fullWidth className='field'
          {...register('password', { required: 'put correct' })}
        />
        <div className='register-submit'>
          <button type='submit' className='btn btn-solid'>Sing In</button>
        </div>
      </form>
    </div>
  )
}

export default Register
