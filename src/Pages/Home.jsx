import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Post, Sidebar } from '../components'
import { useGetPostsQuery } from '../services/postApi'

import placeImg from '../img/images.png'
import { isEditable } from '@testing-library/user-event/dist/utils'

const Home = () => {

  const [posts, setPosts] = useState([])
  const postsQuery = useGetPostsQuery();
  const postsList = postsQuery.data;
  const postsIsFeatching = postsQuery.isFetching;

  const userData = useSelector((state) => state.authSlice.data)
  // const isAuth = useSelector((state) => state.authSlice.isLoggedIn)


  useEffect(() => {
    if (postsList) {
      setPosts(postsList)
    }
  }, [postsList, postsIsFeatching]);

  console.log(userData?.data?._id)

  return (
    <div className='home'>
      <div className='conteiner'>
        <div className='tabs' >
          <div className='tab' >Newest</div>
          <div className='tab' >Popular</div>
        </div>

        <div className='home-wrapper'>
          <div className='home-posts'>
            {
              (postsIsFeatching ? [...Array(5)] : posts).map((post, index) => (
                postsIsFeatching ? (
                  <Post isLoading={true} key={index} />
                ) : (
                  <Post
                    key={post._id}
                    id={post?._id}
                    title={post?.title}
                    imageUrl={post?.imageUrl ? `http://localhost:4444${post?.imageUrl}` : placeImg}
                    userName={post?.user?.fullName}
                    userImg={post?.user?.image}
                    createdAt={post?.createdAt}
                    viewsCount={post?.viewsCount}
                    commentsCount={post?.commentsCount}
                    tags={post?.tags}
                    isEditable={userData?.data?.userData?._id === post?.user?._id || userData?.data?._id === post?.user?._id}
                  />
                )
              ))
            }
          </div>
          <div className='home-sidebar'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
