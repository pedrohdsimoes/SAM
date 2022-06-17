import { Opacity } from '@mui/icons-material';
import React, {useState} from 'react';
import './homePage.css';

export default function Home() {
  return (
    <div >
      <video autoPlay loop muted playsInline 
      style={{
        position: 'absolute',
        width: '100%', 
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        zIndex: '-1',
        }}>
        <source 
          src='./home_video.mp4' 
          type="video/mp4" 
        />
      </video>
      <div className='text'>
        <h1>Welcome to NomaDrive</h1>
      </div>
    </div>
  )
}

