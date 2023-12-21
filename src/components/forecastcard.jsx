import { motion } from 'framer-motion';

import { DateTime } from 'luxon';

export default function ForecastCard({ weather, index, setWeatherIndex, delay }) {
  return (
    <motion.button initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0, transition: { delay: delay } }} exit={{ opacity: 0, y: 20 }} whileHover={{ scale: 1.05, transition: { duration: 0.1 } }} transition={{ ease: 'easeInOut' }} className='px-5 py-4 bg-zinc-700 border-2 rounded-xl text-xl text-white font-bold' onClick={() => setWeatherIndex(index)}>
      <div className='grid grid-rows-2 items-stretch'>
        <div className='flex'>
          <p className='text-white text-2xl font-bold'>{(weather.temp.day).toFixed()}°C</p>
          <div className='font-medium font-mono text-right ml-auto'>
            <p className='text-white text-3xl'>{DateTime.fromSeconds(weather.dt).plus({ days: 1 }).setLocale('ru').toFormat('cccc')}</p>
            <p className='text-white text-base'>{DateTime.fromSeconds(weather.dt).plus({ days: 1 }).toRelativeCalendar()}</p>
          </div>
        </div>
        <div className='flex items-end'>
          <div className='bg-zinc-400 rounded-full'>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>
          </div>
        </div>
      </div>
    </motion.button>
  )
}