import React from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
 
import avatar from '../img/avatar.jpg'
import { useLoginMutation } from '../services/authApi'
import { setAuthState } from '../redux/slices/authSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register, handleSubmit, setError, formState: {errors}
  } = useForm({
    deafultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const [login, {data}] = useLoginMutation()

  const onSubmit = async (values) => {
    let email = values.email
    let password = values.password

    const userCredentials = {
      email, password
    }

    const responce = await login(userCredentials)
    dispatch(setAuthState({ isLoggedIn: true, data: { ...responce?.data } }));

    if (responce?.data?.token ) {
      window.localStorage.setItem('token', responce?.data?.token)
      window.localStorage.setItem('current_user_id', responce?.data?.userData?._id);
    } else {
      return alert('login failed')
    }

    navigate('/')
  }

  return (
    <div className='register'>
      <h2 className='register-title' >Log In</h2>
      <img src={avatar} alt="" />
      <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" error={Boolean(errors.email?.message)} helperText={Boolean(errors.email?.message)} fullWidth className='field' 
            {...register('email', {required: 'put correct'})}
        />
        <TextField label="Password" error={Boolean(errors.password?.message)} helperText={Boolean(errors.password?.message)} fullWidth className='field'
            {...register('password', {required: 'put correct'})}
        />
        <div className='register-submit'>
          <button type='submit' className='btn btn-solid'>Sing In</button>
        </div>
      </form>
      {/* <form className='redister-form'>

          <div className='register-field'>
            <input type="text" name='email' className='input-activ' />
            <label for="email">Email</label>
          </div>

          <div className='register-field'>
            <input type="password" name='password' className='input-activ' />
            <label for="password">Password</label>
        </div>
        <div className='register-submit'>
          <button type='submit' className='btn btn-solid'>Sing In</button>
        </div>
      </form> */}
    </div>
  )
}

export default Login
