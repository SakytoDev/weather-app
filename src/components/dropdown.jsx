import { useState, useEffect } from 'react';

import arrow from '../assets/arrow.png';
import info from '../assets/info.png';

function DropdownItem({ item, onSelect }) {
  return (
    <button className='p-2 bg-zinc-700 text-left outline-none transition ease-in-out hover:bg-opacity-50' onClick={() => onSelect(item)}>{item.city}</button>
  )
}

export default function Dropdown({ items, location, getLocation, onChange }) {
  const [isShown, setShow] = useState(false)
  const [current, setCurrent] = useState('')

  function onSelect(item) {
    setCurrent(item)

    onChange(item)
  }

  useEffect(() => {
    onChange(items)
  }, [])

  return (
    <a className={`relative p-2 bg-zinc-600 border-2 rounded-xl ${isShown ? 'rounded-b-none' : 'transition-all ease-in-out duration-300 delay-200'} text-white font-medium`} onClick={() => setShow((prev) => !prev)}>
      <div className='flex items-center'>
        <p className='text-left'>{current.city}</p>
        <img className={`w-8 h-8 ml-auto transition ease-in-out duration-300 ${isShown ? 'rotate-[-90deg]' : 'rotate-90'}`} src={arrow}/>
      </div>
      <div className={`mt-2 -m-[2px] border-2 border-t-0 rounded-b bg-zinc-600 overflow-y-auto transition-all ease-in-out duration-300 ${isShown ? 'max-h-[240px]' : 'max-h-0 border-b-0'} absolute left-0 right-0 grid`}>
        <div className='grid'>
          <p className='px-2 py-1 text-center'>Ваше местоположение</p>
          { !location.error 
          ? <DropdownItem item={location} onSelect={onSelect}/>
          :
          <div className='p-2 bg-zinc-700 flex items-center gap-1'>
            <img className='w-8 h-8' src={info}/>
            <button className={`text-left text-sm ${!location.disabled ? 'text-blue-300 underline' : ''}`} onClick={getLocation} disabled={location.disabled}>{location.error}</button>
          </div>
          }
        </div>
        <div className='grid'>
          <p className='px-2 py-1 text-center'>Другие варианты</p>
          { items.map((item, index) => {
            if (!item.isUserLocation) {
              return <DropdownItem key={index} item={item} onSelect={onSelect}/>
            }
          })}
        </div>
      </div>
    </a>
  )
}