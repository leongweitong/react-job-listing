import React, { useState, useEffect } from 'react'
const allImages = import.meta.glob('../assets/images/*.jpeg')

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true)
    const [heros, setHeros] = useState([])
    const [images, setImages] = useState({})

    useEffect(() => {
        const loadImages = async () => {
            const importedImages = {};
            for (const img in allImages) {
              const imageModule = await allImages[img]();
              const imageName = img.replace('../assets/images/', '');
              importedImages[imageName] = imageModule.default;
            }
            setImages(importedImages);
          };
      
        loadImages();

        const fetchHeros = async () => {
          try {
            const res = await fetch('/api/heros');
            const data = await res.json();
            setHeros(data);
          } catch (error) {
            console.error("Error fetching hero images:", error);
          }
        };
    
        fetchHeros();
    
        const handleAnimation = () => {
          setIsAnimating(false);
          const timeoutId = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heros.length);
            setIsAnimating(true);
          }, 1000); // Match the duration of your fadeOutSlide animation
    
          return () => clearTimeout(timeoutId);
        };
    
        const intervalId = setInterval(handleAnimation, 8000);
    
        return () => clearInterval(intervalId);
    }, [heros.length]);

    const getNextIndex = (index, step) => (index + step) % heros.length
    
    return (
        <section className="container-xl lg:container mx-auto px-4 pt-4">
            <div className='flex flex-row gap-2 md:gap-4 justify-between h-48 md:h-96 overflow-hidden relative'>
                <div className='w-9/12 md:w-10/12 overflow-hidden'>
                {heros.length > 0 && (
                    <img
                    src={images[heros[currentIndex].name]}
                    alt=""
                    className={`h-full w-full object-cover rounded-lg ${isAnimating ? 'animate-fadeInSlide' : 'animate-fadeOutSlide'}`}
                    />
                )}
                </div>
                {heros.length > 0 && Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className='w-1/12 overflow-hidden'>
                    <img
                    src={images[heros[getNextIndex(currentIndex, i + 1)].name]}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                    />
                </div>
                ))}
            </div>
        </section>
    )
}

export default Hero