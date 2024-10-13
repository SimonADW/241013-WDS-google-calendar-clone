import { useState } from 'react'

const useEvent = () => {
	const [eventsArray, setEventsArray] = useState([{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }])

	const addEvent = (event) => {
		// Code to add an event here
	}
	
	const editEvent = (event) => {
		// Code to edit an event here	
	}

	const deleteEvent = (event) => {	
		// Code to delete an event here
	}


  return [eventsArray, addEvent, editEvent, deleteEvent]
}

export default useEvent