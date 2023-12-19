import pressure from '../assets/pressure.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

export default function WeatherCard({ weather, index }) {
  return (
    <div className='grid grid-rows-[auto,auto,auto]'>
      <div className='py-2 border-2 rounded-t-xl flex flex-col items-center'>
        <p className='text-white text-5xl font-bold font-mono'>{weather.name}</p>
        <div className='flex items-center gap-2'>
          <div className='bg-zinc-400 rounded-full'>
            <img className='w-7 h-7' src={`https://openweathermap.org/img/wn/${weather.daily[index].weather[0].icon}.png`}/>
          </div>
          <p className='text-white text-xl font-mono'>{weather.daily[index].weather[0].description}</p>
        </div>
      </div>
      <div>
        <p className='mt-2 border-l-2 border-r-2 text-white text-center text-5xl font-bold'>{(weather.daily[0].temp.day - 273.15).toFixed()}°C</p>
        <p className='mb-2 border-l-2 border-r-2 text-white text-center'>По ощущениям: {(weather.daily[0].feels_like.day - 273.15).toFixed()}°C</p>
      </div>
      <div className='border-t-2 grid grid-cols-2'>
        <div className='pl-2 border-2 border-t-0 rounded-bl-xl text-white font-medium flex flex-col justify-center'>
          <div className='flex items-center gap-1'>
            <img className='w-7 h-7' src={pressure}/>
            <p>{weather.daily[index].pressure}</p>
          </div>
          <div className='flex items-center gap-1'>
            <img className='w-7 h-7' src={humidity}/>
            <p>{weather.daily[index].humidity}%</p>
          </div>
        </div>
        <div className='p-2 border-2 border-t-0 rounded-br-xl text-white font-medium flex gap-1'>
          <img className='w-7 h-7' src={wind}/>
          <div>
            <p>{weather.daily[index].wind_speed} м/с</p>
            <p>{weather.daily[index].wind_deg}°</p>
          </div>
        </div>
      </div>
    </div>
  )
}