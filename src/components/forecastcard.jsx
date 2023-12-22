import { motion } from 'framer-motion';

import { DateTime } from 'luxon';

export default function ForecastCard({ weather, index, setWeatherIndex, delay, className }) {
  return (
    <motion.button initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0, transition: { delay: delay } }} exit={{ opacity: 0, y: 20 }} transition={{ ease: 'easeInOut' }} className={`px-5 py-4 bg-gradient-to-br from-zinc-600 to-zinc-900 border-2 rounded-xl text-xl text-white font-bold ${className}`} onClick={() => setWeatherIndex(index)}>
      <div className='grid grid-rows-2 items-stretch'>
        <div className='flex'>
          <p className='text-white text-2xl font-bold'>{(weather.temp.day).toFixed()}°C</p>
          <div className='font-medium font-mono text-right ml-auto'>
            <p className='text-white text-2xl'>{DateTime.fromSeconds(weather.dt).setLocale('ru').toFormat('dd LLL')}</p>
            <p className='text-white text-base'>{DateTime.fromSeconds(weather.dt).toRelativeCalendar()}</p>
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