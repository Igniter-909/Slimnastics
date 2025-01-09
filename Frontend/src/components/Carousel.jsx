import React, { useState,useEffect } from 'react'

function Carousel({images}) {

    const [currentIndex,setCurrrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrrentIndex((prevIndex) => (prevIndex+1) % images.length);
        },5000);
        return () => clearInterval(interval)
    },[images.length]);


  return (

    <div className='w-full md:w-2/3 relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg'>
        {images.map((image,index) => (
            <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity rounded-lg overflow-hidden duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
                <img src={image} alt={`Slide ${index=1}`} className='rounded-lg w-full h-full object-fill'  />
            </div>
        ))}
    </div>
  )
}

export default Carousel;