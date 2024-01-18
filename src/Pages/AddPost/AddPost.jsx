import React, { useState, useRef, useCallback, useEffect  } from 'react'
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material'
import SimpleMde from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

import avatar from '../../img/avatar.jpg'
import customAxios from '../axiosInstance';
import styles from './AddPost.module.scss'
import { useCreatePostMutation, useUploadImageMutation } from '../../services/postApi';

const AddPost = () => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { id } = useParams();
  const isAuth = useSelector((state) => state.authSlice.isLoggedIn)
  const isEditing = Boolean(id);
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadImageMutation()

  const onSubmit = async () => {
    try {
      const fields = {
        title, 
        imageUrl, 
        tags, 
        text
      }

      const { data } = isEditing ? await customAxios.patch(`/posts/${id}`, fields) : await customAxios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      
      navigate(`/posts/${_id}`)
    } catch (err) {
      console.warn(err)
    }
  }

  const onClickRemoveImg = () => {
    setImageUrl('')
  }

  const handleChangeFile = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0]

    formData.append('image', file);

    const { data } = await uploadImage(formData)

    setImageUrl(data.url)
   
  }

  const onChange = useCallback((value) => {
    setText(value)
  }, [])

  useEffect(() => {
    if (id) {
      customAxios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    navigate('/')
  }

  return (
    <div className='post-editor'>
      <div className='conteiner'>
        <div className="image">
          <Button variant='outlined' size='large' onClick={() => inputRef.current.click()}>Load IMG</Button>
          <input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
          {
            imageUrl && (
              <>
                <Button variant='contained' color='error' onClick={onClickRemoveImg}>Delete</Button>
                <img src={`http://localhost:4444${imageUrl}`} alt="" />
              </>
            )
          }
        </div>
        <br /><br />
        <TextField value={title || ''} onChange={(e) => setTitle(e.target.value)} variant='standard' placeholder='Post title' fullWidth classes={{ root: styles.title }} />
        <TextField value={tags || ''} onChange={(e) => setTags(e.target.value)} variant='standard' placeholder='Tags' fullWidth classes={{ root: styles.tags }} />
        <SimpleMde  value={text || ''}  className={styles.editor}  onChange={onChange} />
        <div className={styles.buttons} >
          <Button size='large' variant='contained' color='primary' onClick={onSubmit} >Add Post</Button>
          <Button size='large' variant='outlined' color='primary'  >Cencel</Button>
        </div>
      </div>
    </div>
  )
}

export default AddPost