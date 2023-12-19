import spinner from '../assets/spinner.png';

export default function Spinner({ className }) {
  return (
    <img className={`animate-spinner ${className}`} src={spinner}/>
  )
}