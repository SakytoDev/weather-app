import { useState } from 'react';
import { motion } from 'framer-motion';

import axios from 'axios';

import Dropdown from './components/dropdown';
import Carousel from './components/carousel';

import WeatherCard from './components/weathercard';
import Spinner from './components/spinner';

import { cities } from './assets/cities';
import bg from './assets/background.jpg';

function App() {
  const [weather, setWeather] = useState(null)
  const [index, setWeatherIndex] = useState(0)

  const [location, setLocation] = useState({ error: 'Разрешить использовать своё местоположение', disabled: false })
  const [city, setCity] = useState('')

  const [loading, setLoad] = useState(false)

  function handleChange(value) {
    setCity(value)
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      setLocation({ error: 'Геолокация не поддерживается', disabled: true })
    }
  }

  function success(position) {
    setLocation({ city: 'Использовать моё местоположение', location: [position.coords.latitude, position.coords.longitude] })
  }
  
  function error() {
    setLocation({ error: 'Вы запретили использование вашего местоположения', disabled: true })
  }

  async function getWeather() {
    if (city) {
      setLoad(true)

      // Получение данных о локации
      const info = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${city.location[0]}&lon=${city.location[1]}&limit=1&appid=${import.meta.env.VITE_API_KEY}&lang=ru`)
      .then((res) => { return res.data })
      .catch((err) => console.log(err))

      // Получение прогноза на 7 дней
      const weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.location[0]}&lon=${city.location[1]}&exclude=minutely,hourly,alerts&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=ru`)
      .then((res) => { return res.data })
      .catch((err) => console.log(err))

      setLoad(false)

      const weatherObj = {
        name: info[0].local_names.ru,
        daily: weather.daily
      }

      setWeather(weatherObj)
    }
  }

  return (
    <>
      <img className='bg-zinc-800 absolute h-full w-full object-cover blur -z-[1]' src={bg}/>

      <div className='min-h-screen grid grid-rows-[auto,auto,auto] grid-cols-3'>
        <motion.div className='h-fit m-5 col-start-2' layout>
          <div className='p-5 bg-zinc-700 border-2 rounded-xl'>
            { loading 
            ?
            <div className='flex items-center justify-center gap-2'>
              <Spinner className='w-8 h-8'/>
              <p className='text-xl text-white font-medium'>Проверяем погоду...</p>
            </div>
            :
            <div>
              { !weather 
              ?
              <div className='flex flex-col justify-center gap-2'>
                <p className='mb-2 text-white text-center text-xl font-bold'>Выбор города:</p>
                <Dropdown items={cities} location={location} getLocation={getLocation} onChange={handleChange}/>
                <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-600' onClick={() => getWeather()}>Посмотреть погоду</button>
              </div>
              :
              <div className='flex flex-col gap-2'>
                <WeatherCard weather={weather} index={index}/>
                <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-600' onClick={() => setWeather(null)}>Сменить погоду</button>
              </div>
              }
            </div> 
            }
          </div>
        </motion.div>
        <Carousel slides={weather?.daily} setWeatherIndex={setWeatherIndex} className='m-5 grid row-start-3 col-span-3'/>
      </div>
    </>
  )
}

export default App
