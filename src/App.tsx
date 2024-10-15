import { useContext } from 'react'
import './App.css'
import { EventContext } from './components/EventProvider/EventProvider'
import Calendar from './components/Calendar/Calendar'

function App() {
  const eventsArray = useContext(EventContext)
  
  return (
    <>
      <Calendar />
    </>
  )
}

export default App
