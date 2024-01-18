import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import avatar from '../../img/avatar.jpg'
import './post.scss'
import PostSkeleton from './Skeleton';
import { useRemovePostMutation } from '../../services/postApi';


const Post = ({
  id, title, createdAt, imageUrl, userName, userImg, viewsCount, commentsCount, tags, isLoading, isEditable
}) => {

  console.log(isEditable)


  const dispatch = useDispatch();

  const [removePost] = useRemovePostMutation();
  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove the post?')) {
      removePost(id)
    }
  };

  if (isLoading) {
    return <PostSkeleton />
  }

  return (
    <div className='post-item'>
      {
        isEditable && (
          <div className='edit-btns'>
            <Link to={`/posts/${id}/edit`}><EditIcon /></Link>
            <button onClick={onClickRemove}><DeleteForeverIcon/></button>
          </div>
        )
      }

      <img src={imageUrl} alt="" className='post-item-img' />
      <div className='post-item-info'>
        <div className='post-item-user-info' >
          <img src={userImg || avatar} alt="" />
          <div className='post-item-user-name' >
            <div className='name' >{userName}</div>
            <div className='date' >{createdAt}</div>
          </div>
        </div>

        <div className='post-item-info-details' >
          <h2 className='post-item-title' ><Link to={`/posts/${id}`}>{title}</Link></h2>
          <ul className='post-item-tags'>
            {tags?.map((tag) => (
              <li><Link to="#">#{tag}</Link></li>
            ))}
          </ul>
          <ul className='post-item-actions'>
            <li><RemoveRedEyeIcon /><span>{viewsCount}</span></li>
            <li><ChatBubbleIcon /><span>{commentsCount}</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post
