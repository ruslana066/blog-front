import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Post } from '../components'
import avatar from '../img/avatar.jpg'
import { useGetPostDetailsQuery } from '../services/postApi'


const SinglePost = () => {

  const {id} = useParams()
  const [ postData, setPostData ] = useState()

  const { data, isFeathing } = useGetPostDetailsQuery(id)

  useEffect(() => {
    setPostData(data)
  }, [data, isFeathing])

  // console.log(postData)

  return (
    <div className='single-post'>
      <div className='conteiner'>
        <div className='single-post-wrap'>
          <Post
            id={postData?._id}
            title={postData?.title}
            commentsCount={postData?.commentsCount || 0}
            createdAt={postData?.createdAt}
            tags={postData?.tags}
            // user={{avatarUrl: {noAvatarImg}, fullName: 'Jon Snow'}}
            userName={postData?.user?.fullName}
            userImg={postData?.user?.imageUrl}
            imageUrl={`http://localhost:4444${postData?.imageUrl}`}
            viewsCount={postData?.viewsCount || 0}
          />
          <div className="text-block">{postData?.text}</div>
          <div className="comments-block">
            <ul>
              <li>
                <div className='comments-block-item'>
                  <img src={avatar} />
                  <div className='comments-block-item-info' >
                    <div className="comments-block-item-name">Petya Dudokin</div>
                    <div className="comments-block-item-txt">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maxime cupiditate molestiae enim laudantium. Enim molestias, qui illum numquam, repudiandae dicta aspernatur necessitatibus atque, recusandae non nostrum fuga asperiores vitae!</div>
                  </div>
                </div>
              </li>
              <li>
                <div className='comments-block-item'>
                  <img src={avatar} />
                  <div className='comments-block-item-info' >
                    <div className="comments-block-item-name">Petya Dudokin</div>
                    <div className="comments-block-item-txt">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maxime cupiditate molestiae enim laudantium. Enim molestias, qui illum numquam, repudiandae dicta aspernatur necessitatibus atque, recusandae non nostrum fuga asperiores vitae!</div>
                  </div>
                </div>
              </li>
              <li>
                <div className='comments-block-item'>
                  <img src={avatar} />
                  <div className='comments-block-add' >
                    <form action="" className='comments-block-form'>
                      <div className="comments-block-field">
                        <input type="text" name='comment' />
                        <label for='comment'>Add comment</label>
                      </div>
                      <div className="comments-block-submit">
                        <button type='submit' className='btn btn-solid'>Add Comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
