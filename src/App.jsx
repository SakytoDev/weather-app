import { useEffect, useState } from 'react';

import axios from 'axios';

import Dropdown from './components/dropdown';

import { cities } from './assets/cities';
import bg from './assets/background.jpg';

import pressure from './assets/pressure.png';
import humidity from './assets/humidity.png';
import wind from './assets/wind.png';

function App() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState({ error: 'Разрешить использовать своё местоположение', disabled: false })
  const [city, setCity] = useState('')

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
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
  }
  
  function error() {
    setLocation({ error: 'Вы запретили использование вашего местоположения', disabled: true })
  }

  async function getWeather() {
    if (city) {
      if (city.city == 'userLocation' && !location.error) {
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_API_KEY}&lang=ru`)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err))
      } else {
        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.city}&limit=1&appid=${import.meta.env.VITE_API_KEY}&lang=ru`)
        .then(async (res) => { 
          const result = res.data[0]

          await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${result.lat}&lon=${result.lon}&appid=${import.meta.env.VITE_API_KEY}&lang=ru`)
          .then((res) => setWeather(res.data))
          .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
      }
    }
  }

  return (
    <>
      <img className='bg-zinc-800 absolute h-full w-full object-cover blur -z-[1]' src={bg}/>

      <div className='min-h-screen grid'>
        <div className='m-5 flex items-start justify-center'>
          <div className='w-[35%] p-5 bg-zinc-700 border-2 rounded-xl'>
            { !weather 
            ?
            <div className='flex flex-col justify-center gap-2'>
              <p className='mb-2 text-white text-center text-xl font-bold'>Выбор города:</p>
              <Dropdown items={cities} location={location} getLocation={getLocation} onChange={handleChange}/>
              <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-600' onClick={() => getWeather()}>Посмотреть погоду</button>
            </div>
            :
            <div className='grid grid-rows-[auto,auto,auto]'>
              <div className='py-2 border-2 rounded-t-xl flex flex-col items-center'>
                <p className='text-white text-5xl font-bold font-mono'>{weather.city.name}</p>
                <p className='text-white text-xl font-mono'>{weather.list[0].weather[0].description}</p>
              </div>
              <div>
                <p className='mt-2 border-l-2 border-r-2 text-white text-center text-5xl font-bold'>{(weather.list[0].main.temp - 273.15).toFixed()}°C</p>
                <p className='mb-2 border-l-2 border-r-2 text-white text-center'>По ощущениям: {(weather.list[0].main.feels_like - 273.15).toFixed()}°C</p>
              </div>
              <div className='border-t-2 grid grid-cols-2'>
                <div className='pl-2 border-2 border-t-0 rounded-bl-xl text-white font-medium flex flex-col justify-center'>
                  <div className='flex items-center gap-1'>
                    <img className='w-7 h-7' src={pressure}/>
                    <p>{weather.list[0].main.pressure}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <img className='w-7 h-7' src={humidity}/>
                    <p>{weather.list[0].main.humidity}%</p>
                  </div>
                </div>
                <div className='p-2 border-2 border-t-0 rounded-br-xl text-white font-medium flex gap-1'>
                  <img className='w-7 h-7' src={wind}/>
                  <div>
                    <p>{weather.list[0].wind.speed} м/с</p>
                    <p>{weather.list[0].wind.deg}°</p>
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
