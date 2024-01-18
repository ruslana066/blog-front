import { Router, Route, Link, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Footer, Header, Post, Profile, Sidebar } from "./components";
import { Home, Login, Register, AddPost, SinglePost } from './Pages'
import './index.scss'
import { useGetProfileQuery } from './services/authApi';
import { getProfile } from './redux/slices/authSlice'


function App() {

  const dispatch = useDispatch();

	const storedAuthData = localStorage.getItem('token');
	const userId = localStorage.getItem('current_user_id');
	const profile = useGetProfileQuery(userId);
	const { data } = profile;
  console.log(data)

	useEffect(() => {
		if (storedAuthData) {
			dispatch(getProfile({ isLoggedIn: true, data}))
		}
	}, [data, profile]);

  
  return (
    <>
      <Header />

      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/posts/:id' element={<SinglePost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;