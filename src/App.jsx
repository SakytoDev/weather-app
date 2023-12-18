import { useEffect, useState } from 'react';

import Dropdown from './components/dropdown';

import { cities } from './assets/cities';
import bg from './assets/background.jpg';

function App() {
  const [city, setCity] = useState('')

  function handleChange(value) {
    setCity(value)
  }

  return (
    <>
      <img className='bg-zinc-800 absolute h-full w-full object-cover blur -z-[1]' src={bg}/>

      <div className='min-h-screen grid'>
        <div className='m-5 flex items-start justify-center'>
          <div className='w-[30%] p-5 bg-zinc-700 border-2 rounded-xl flex flex-col justify-center gap-2'>
            <p className='mb-2 text-white text-center text-xl font-bold'>Выбор города:</p>
            <Dropdown items={cities.map((item) => { return item.local })} onChange={handleChange}/>
            <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-600'>Посмотреть погоду</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
