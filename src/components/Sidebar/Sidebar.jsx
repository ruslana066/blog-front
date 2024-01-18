import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import avatar from '../../img/avatar.jpg'
import './sidebar.scss'
import { useGetTagsQuery } from '../../services/tagsApi'


const Sidebar = (posts) => {

  const [tags, setTags] = useState([])

  const tagsQuery = useGetTagsQuery();

  const tagsList = tagsQuery.data;
  const tagsIsFeatching = tagsQuery.isFetching;

  useEffect(() => {
    if (tagsList) {
      setTags(tagsList)
    }
  }, [tagsList, tagsIsFeatching]);

  // const sortPost = (i) => {
  //   if(posts.tags == i) {
  //     posts.filter()
  //   }
  // }

  // console.log(tags)

  const unicTags = Array.from(new Set(tags))

  return (
    <div className='sidebar' >
      <div className='tags-block side-block' >
        <div className="tags-block-title">Tags</div>
        <ul> 
          {
            unicTags.slice(0, 3).map((item, i) => (
              <li ><div><LocalOfferIcon/><Link to='#'>{item}</Link></div></li>
            ))
          }
        </ul>
      </div>
      <div className="comments-block side-block">
        <div className="comments-block-title">Comments</div>
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
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
