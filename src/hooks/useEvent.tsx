import { useState } from 'react'

export type Event = {
	id: number;
	title: string;
};

export type AddEvent = (event: Event) => void;
export type EditEvent = (event: Event) => void;
export type DeleteEvent = (event: Event) => void;


const useEvent = (): [Event[], AddEvent, EditEvent, DeleteEvent] => {
	const [eventsArray, setEventsArray] = useState<Event[]>([{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }])

	const addEvent: AddEvent = (event) => {
		setEventsArray([...eventsArray, event])
		// Code to add an event heres
	}
	
	const editEvent: EditEvent = (event) => {
		setEventsArray(eventsArray.map((e) => e.id === event.id ? event : e))
		// Code to edit an event here	
	}

	const deleteEvent: DeleteEvent = (event) => {	
		setEventsArray(eventsArray.filter((e)=> e.id !== event.id))
		// Code to delete an event here
	}


  return [eventsArray, addEvent, editEvent, deleteEvent]
}

export default useEvent