import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import carouselArrow from '../assets/carouselArrow.png';

import ForecastCard from './forecastcard.jsx';

export default function Carousel({ slides, setWeatherIndex, className }) {
  const [index, setIndex] = useState(0)
  const maxSlides = 3

  const leftButton = () => {
    if (index <= 0) return

    setIndex((curr) => curr - 1)
  }

  const rightButton = () => {
    if (index >= slides.length - maxSlides) return

    setIndex((curr) => curr + 1)
  }

  useEffect(() => {
    setIndex(0)
  }, [slides])

  return (
    <div className={`relative ${className}`}>
      <div className={`grid grid-cols-3 items-center justify-center gap-2`}>
        <AnimatePresence mode='wait'>
          { slides?.map((item, i) => {
            if (i < maxSlides + index && i >= 0 + index) {
              return <ForecastCard key={i} weather={item} index={i} setWeatherIndex={setWeatherIndex} delay={i * 0.1}/>
            }
          })}
        </AnimatePresence>
      </div>
      <div className='-mx-2 absolute inset-0 flex items-center justify-between invisible'>
        <button className={`${index > 0 ? 'visible' : 'invisible'}`} onClick={() => leftButton()}><img className='w-8 h-8 rotate-180 transition ease-in-out hover:scale-110' src={carouselArrow}/></button>
        <button className={`${index < slides?.length - maxSlides ? 'visible' : 'invisible'}`} onClick={() => rightButton()}><img className='w-8 h-8 transition ease-in-out hover:scale-110' src={carouselArrow}/></button>
      </div>
    </div>
  )
}