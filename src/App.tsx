import { useContext } from 'react'
import './App.css'
import { EventContext } from './components/EventProvider/EventProvider'

function App() {
  const [eventsArray] = useContext(EventContext)

  console.log(eventsArray);
  
  return (
    <>
      {eventsArray.map((booking) => (
        <div key={booking.id}>
          <h1>{booking.title}</h1>
        </div>
      ))
    }
    </>
  )
}

export default App
