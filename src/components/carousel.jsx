import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import carouselArrow from '../assets/carouselArrow.png';

import ForecastCard from './forecastcard.jsx';

export default function Carousel({ slides, weatherIndex, setWeatherIndex, className }) {
  const [index, setIndex] = useState(0)
  const [maxSlides, setMaxSlides] = useState(1)

  function returnMaxSlides() {
    const width = window.innerWidth

    if (width >= 1536) setMaxSlides(5)
    if (width < 1536 && width >= 1280) setMaxSlides(4)
    if (width < 1280 && width >= 1024) setMaxSlides(3)
    if (width < 1024 && width >= 768) setMaxSlides(2)
    if (width < 768) setMaxSlides(1)
  }

  const handleLeftSwipe = () => {
    if (index <= 0) return

    setIndex((curr) => curr - 1)

    if (maxSlides == 1) setWeatherIndex(index - 1)
  }

  const handleRightSwipe = () => {
    if (index >= slides.length - maxSlides) return

    setIndex((curr) => curr + 1)

    if (maxSlides == 1) setWeatherIndex(index + 1)
  }

  const handleDragEnd = (event, info) => {
    if (info.offset.x >= 100 && index > 0) handleLeftSwipe()
    if (info.offset.x < -100 && index < slides.length - maxSlides) handleRightSwipe()
  }

  useEffect(() => {
    setIndex(0)

    returnMaxSlides()
  }, [slides])

  useEffect(() => {
    window.addEventListener("resize", returnMaxSlides)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <motion.div className={`grid grid-cols-${maxSlides} grid-flow-col auto-cols-fr items-center gap-x-2`} drag='x' dragConstraints={{ left: -50, right: 50 }} dragSnapToOrigin onDragEnd={handleDragEnd}>
        { slides?.map((item, i) => {
          if (i < maxSlides + index && i >= 0 + index) {
            return <ForecastCard key={i} weather={item} index={i} setWeatherIndex={setWeatherIndex} delay={i * 0.1} className={`${i == weatherIndex ? 'border-blue-500' : 'border-white'}`}/>
          }
        })}
      </motion.div>
      <div className='-mx-2 absolute inset-0 flex items-center justify-between invisible'>
        <button className={`${index > 0 ? 'visible' : 'invisible'}`} onClick={() => handleLeftSwipe()}><img className='w-8 h-8 rotate-180 transition ease-in-out hover:scale-110 ' src={carouselArrow}/></button>
        <button className={`${index < slides?.length - maxSlides ? 'visible' : 'invisible'}`} onClick={() => handleRightSwipe()}><img className='w-8 h-8 transition ease-in-out hover:scale-110' src={carouselArrow}/></button>
      </div>
      <div className='absolute inset-0 flex items-end justify-center invisible'>
        { slides ?
        <div className='flex items-center gap-2 visible'>
          {(() => {
            const dotArr = []

            for (let i = 0; i < slides.length - maxSlides + 1; i++) {
              dotArr.push(<button key={i} className={`transition-all ease-in-out ${i == index ? 'w-4 h-4 bg-blue-300 opacity-100' : 'w-2 h-2 bg-white opacity-50'} rounded-full`} onClick={() => setIndex(i)}></button>)
            }

            return dotArr
          })()}
        </div>
        : null }
      </div>
    </div>
  )
}