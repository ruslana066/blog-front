import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import './header.scss'
import { authApi } from '../../services/authApi';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.authSlice.isLoggedIn)

  const onClickLogout = async () => {
    try{
        if(window.confirm('Are you sure you want to log out?'))
        dispatch(logout());
      window.localStorage.removeItem("token")
      window.localStorage.removeItem('current_user_id');
    } catch (err) {
      console.error('err log out', err)
    }
  }

  return (
    <div className='header'>
      <div className='conteiner'>
        <div className='header-wrapper wrapper'>
          <div className='header-logo'>
            <Link to="/">PENGUIN <QuestionAnswerIcon/></Link>
          </div>
          <div className='header-btns' >
            {
              isAuth ? (
                <>
                  <button className='btn btn-error' onClick={onClickLogout} >Log Out</button>
                  <Link to='/add-post' className='btn btn-outlined'>Create Post</Link>
                </>
              ) : (
                <>
                  <Link to='/login' className='btn btn-outlined'>Log In</Link>
                  <Link to='/register' className='btn btn-solid'>Create Profile</Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
