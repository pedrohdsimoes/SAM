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
      <div className='aqui'>
        <h1>A place where you can store all your dreams and memories!</h1>
        <h1>You can add all types of media and organize them by country.</h1> 
        <h1>Explore the world in a new way, where only at NOMADRIVE you can do it.</h1> 
        <h1> Join us!!</h1>
      </div>
    </div>
  )
}

export default About