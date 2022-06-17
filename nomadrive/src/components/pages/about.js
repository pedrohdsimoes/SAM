import React from 'react'
import '././about.css'

const About = () => {
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
        <h1>Nao sei o que colocar aqui</h1>
      </div>
    </div>
  )
}

export default About