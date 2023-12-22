import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import axios from 'axios';

import Dropdown from './components/dropdown';
import Carousel from './components/carousel';

import WeatherCard from './components/weathercard';
import Spinner from './components/spinner';

import { cities } from './assets/cities';

import rain from './assets/backgrounds/rain.mp4';
import snow from './assets/backgrounds/snow.mp4';
import clouds from './assets/backgrounds/clouds.mp4';
import clear from './assets/backgrounds/clear.mp4';

function App() {
  const [weather, setWeather] = useState(null)
  const [index, setWeatherIndex] = useState(0)

  const [location, setLocation] = useState({ error: 'Разрешить использовать своё местоположение', disabled: false })
  const [city, setCity] = useState(null)

  const [loading, setLoad] = useState(false)

  const bgVideo = useRef()

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
    if (city?.location) {
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

  function changeCity() {
    setWeatherIndex(0)
    setWeather(null)
  }

  useEffect(() => {
    bgVideo.current?.load()
  }, [weather?.daily[index].weather[0].main])

  return (
    <>
      <video ref={bgVideo} className='bg-zinc-800 absolute w-full h-full object-cover blur-sm -z-[1]' loop autoPlay muted>
        { weather?.daily[index].weather[0].main == "Rain" ? <source src={rain} type='video/mp4'/> : null }
        { weather?.daily[index].weather[0].main == "Snow" ? <source src={snow} type='video/mp4'/> : null }
        { weather?.daily[index].weather[0].main == "Clouds" ? <source src={clouds} type='video/mp4'/> : null }
        { weather?.daily[index].weather[0].main == "Clear" ? <source src={clear} type='video/mp4'/> : null }
      </video>

      <div className='h-full grid grid-rows-[auto,auto] grid-cols-3 overflow-hidden'>
        <motion.div className='h-fit m-5 col-span-3 lg:col-start-2 lg:col-span-1' layout>
          <div className='p-5 bg-gradient-to-br from-gray-600 to-zinc-900 border-2 rounded-xl'>
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
                <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out disabled:border-gray-500 enabled:hover:bg-indigo-600' disabled={!city?.location} onClick={() => getWeather()}>{ !city?.location ? 'Не выбран город' : 'Посмотреть погоду' }</button>
              </div>
              :
              <div className='flex flex-col gap-2'>
                <WeatherCard weather={weather} index={index}/>
                <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-600' onClick={() => changeCity()}>Сменить город</button>
              </div>
              }
            </div> 
            }
          </div>
        </motion.div>
        <div className='m-5 flex flex-col gap-4 col-span-3'>
          <p className='text-2xl text-white font-medium font-mono self-center'>Прогноз на 7 дней:</p>
          <Carousel slides={weather?.daily} weatherIndex={index} setWeatherIndex={setWeatherIndex} className='flex flex-col'/>
        </div>
      </div>
    </>
  )
}

export default App
