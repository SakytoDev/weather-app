import bg from './assets/background.jpg';

import { cities } from './assets/cities';

function App() {
  return (
    <>
      <img className='absolute h-full w-full object-cover blur -z-[1]' src={bg}/>

      <div className='min-h-screen grid'>
        <div className='m-5 flex items-center justify-center'>
          <div className='w-[30%] flex flex-col justify-center gap-2'>
            <div className='relative p-2 bg-zinc-600 rounded text-white font-medium'>
              <p>Test</p>
            </div>
            <button className='p-2 border-2 border-indigo-500 rounded text-white font-medium transition ease-in-out hover:bg-indigo-700'>Посмотреть погоду</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
