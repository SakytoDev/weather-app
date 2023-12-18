import { useState, useEffect } from 'react';

import arrow from '../assets/arrow.png';

function DropdownItem({ item, index, onSelect }) {
  return (
    <a className='p-2 bg-zinc-700 text-left transition ease-in-out hover:bg-opacity-50' onClick={() => onSelect(index)}>{item}</a>
  )
}

export default function Dropdown({ items, onChange }) {
  const [isShown, setShow] = useState(false)
  const [index, setIndex] = useState(0)

  function onSelect(index) {
    setIndex(index)

    onChange(items[index])
  }

  useEffect(() => {
    onChange(items[index])
  }, [])

  return (
    <button className={`relative p-2 bg-zinc-600 border-2 rounded transition-all ease-in-out ${isShown ? 'rounded-b-none' : ''} text-white font-medium`} onClick={() => setShow((prev) => !prev)}>
      <div className='flex items-center'>
        <p className='text-left'>{items[index]}</p>
        <img className={`w-8 h-8 ml-auto transition ease-in-out duration-300 ${isShown ? 'rotate-[-90deg]' : 'rotate-90'}`} src={arrow}/>
      </div>
      <div className={`mt-2 bg-zinc-600 overflow-y-auto transition-all ease-in-out duration-300 ${isShown ? 'max-h-[240px]' : 'max-h-0'} absolute left-0 right-0 grid`}>
        { items?.map((item, index) => {
          return <DropdownItem key={index} item={item} index={index} onSelect={onSelect}/>
        })}
      </div>
    </button>
  )
}