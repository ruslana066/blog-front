import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

import './footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-wrapper'>
        <h2>PENGUIN social media</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni tenetur enim possimus error fugiat harum? <br />
          Nulla minima, aperiam quasi hic unde commodi illo ab blanditiis accusantium vitae sunt fuga eligendi?</p>
        <div className='footer-wrapper-a'>
          <a href="/"><FacebookIcon /></a>
          <a href="/"><TwitterIcon /></a>
          <a href="/"><XIcon /></a>
          <a href="/"><YouTubeIcon /></a>
          <a href="/"><InstagramIcon /></a>
        </div>
      </div>
      <div className='footer-bottom'>
        <div>
          <p>Copyright @2024 <a href="/">Ruslanadeveloper</a> </p>
        </div>
        <div className='footer-bottom-about'>
          <p className='p'>Home</p>
          <p className='p'>About</p>
          <p className='p'>Contact</p>
          <p className='p'>Blog</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
