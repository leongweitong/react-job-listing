import React, { useState, useEffect } from 'react'
import image1 from '../assets/images/hero-1.jpeg'
import image2 from '../assets/images/hero-2.jpeg'
import image3 from '../assets/images/hero-3.png'

const images = [image1, image2, image3];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        const handleAnimation = () => {
          setIsAnimating(false);
          setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsAnimating(true);
          }, 1000); // Match the duration of your fadeOutSlide animation
        };
    
        const interval = setInterval(handleAnimation, 5000);
    
        return () => clearInterval(interval);
    }, []);
    
    return (
        <section className="container-xl lg:container mx-auto px-4 pt-4">
            <div className='flex flex-row gap-2 md:gap-4 justify-between h-48 md:h-96 overflow-hidden relative'>
                <div className='w-9/12 md:w-10/12 overflow-hidden'>
                    <img src={images[currentIndex]} alt="" className={`h-full w-full object-cover rounded-lg transition transform ${isAnimating ? 'animate-fadeInSlide' : 'animate-fadeOutSlide'}`} />
                </div>
                <div className='w-1/12 overflow-hidden'>
                    <img src={images[(currentIndex + 1) % images.length]} alt="" className={`h-full w-full object-cover rounded-lg`} />
                </div>
                <div className='w-1/12 overflow-hidden'>
                    <img src={images[(currentIndex + 2) % images.length]} alt="" className={`h-full w-full object-cover rounded-lg`} />
                </div>
            </div>
        </section>
    )
}

export default Hero