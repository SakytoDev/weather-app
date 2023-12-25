import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DateTime } from 'luxon';

import pressure from '../assets/weathercard/pressure.png';
import humidity from '../assets/weathercard/humidity.png';
import wind from '../assets/weathercard/wind.png';
import arrow from '../assets/weathercard/windArrow.png';

import morn from '../assets/weathercard/morn.png';
import day from '../assets/weathercard/day.png';
import eve from '../assets/weathercard/eve.png';
import night from '../assets/weathercard/night.png';

export default function WeatherCard({ weather, index }) {
  const [timeIndex, setTimeIndex] = useState(0)
  const dayTimes = [ 
    { 
      icon: morn,
      local: 'Утром:',
      temp: weather.daily[index].temp.morn,
      feels_like: weather.daily[index].feels_like.morn
    },
    { 
      icon: day,
      local: 'Днём:',
      temp: weather.daily[index].temp.day,
      feels_like: weather.daily[index].feels_like.day
    },
    { 
      icon: eve,
      local: 'Вечером:',
      temp: weather.daily[index].temp.eve,
      feels_like: weather.daily[index].feels_like.eve
    },
    { 
      icon: night,
      local: 'Ночью:',
      temp: weather.daily[index].temp.night,
      feels_like: weather.daily[index].feels_like.night
    }
  ]

  function degreesToText(degree) {
    const degArr = ['С', 'ССВ', 'СВ', 'ВСВ', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ']

    return degArr[((degree / 22.5) - 0.5).toFixed()]
  }

  function changeDayType() {
    if (timeIndex == dayTimes.length - 1) setTimeIndex(0)
    else setTimeIndex(prev => prev + 1)
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={index} className='text-white' initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.2 }}>
        <div className='py-2 border-2 rounded-t-xl flex flex-col items-center font-mono'>
          <p className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl'>{weather.name}</p>
          <div className='flex flex-col items-center'>
            <p className='text-xl'>{DateTime.fromSeconds(weather.daily[index].dt).setLocale('ru').toFormat('cccc')}</p>
            <div className='flex items-center gap-2'>
              <img className='bg-zinc-400 rounded-full w-7 h-7' src={`https://openweathermap.org/img/wn/${weather.daily[index].weather[0].icon}.png`}/>
              <p className='text-lg'>{weather.daily[index].weather[0].description}</p>
            </div>
          </div>
        </div>
        <div className='p-2 border-l-2 border-r-2 flex'>
          <AnimatePresence mode='wait'>
            <motion.div key={timeIndex} initial={{ x: 10, opacity: 0}} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.2 }} className='ml-2'>
              <p className='text-xl font-bold'>{dayTimes[timeIndex].local} {(dayTimes[timeIndex].temp).toFixed()}°C</p>
              <p>По ощущениям: {(dayTimes[timeIndex].feels_like).toFixed()}°C</p>
            </motion.div>
          </AnimatePresence>
          <button className='px-2 border-2 border-indigo-500 rounded-xl ml-auto transition ease-in-out hover:bg-indigo-600' onClick={() => changeDayType()}>
            <AnimatePresence mode='wait'>
              <motion.img
                key={timeIndex}
                initial={{ y: 5, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: -5, opacity: 0 }} 
                transition={{ ease: 'easeInOut', duration: 0.2 }}
                className='w-8 h-8' 
                src={dayTimes[timeIndex].icon}/>
            </AnimatePresence>
          </button>
        </div>
        <div className='border-t-2 grid grid-cols-2'>
          <div className='pl-2 border-2 border-t-0 rounded-bl-xl font-medium flex flex-col justify-center'>
            <div className='flex items-center gap-1'>
              <img className='w-7 h-7' src={pressure}/>
              <p>{(weather.daily[index].pressure * 0.75).toFixed()} мм рт. ст.</p>
            </div>
            <div className='flex items-center gap-1'>
              <img className='w-7 h-7' src={humidity}/>
              <p>{weather.daily[index].humidity}%</p>
            </div>
          </div>
          <div className='p-2 border-2 border-t-0 border-l-0 rounded-br-xl font-medium flex gap-1'>
            <img className='w-7 h-7' src={wind}/>
            <div>
              <p>{(weather.daily[index].wind_speed).toFixed(1)} м/с</p>
              <div className='flex items-center gap-1'>
                <p>{degreesToText(weather.daily[index].wind_deg)}</p>
                <img className='w-4 h-4' style={{ transform: `rotate(${weather.daily[index].wind_deg}deg)` }} src={arrow}/>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}