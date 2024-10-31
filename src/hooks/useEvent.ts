import { useCallback, useEffect, useState } from "react";

export type Event = {
	date: string,
	name: string,
	allDay: boolean,
	startTime: string,
	endTime: string,
	color: string,
	id: number,
};

export type AddEvent = (event: Event) => void;
export type EditEvent = (event: Event) => void;
export type DeleteEvent = (event: Event) => void;
export type EventsArray = Event[];

export type UseEventTypes = {
	eventsArray: Event[],
	addEvent: AddEvent,
	editEvent: EditEvent,
	deleteEvent: DeleteEvent
};

// CUSTOM HOOK TO STORE AND PROVIDE CALENDAR-EVENTS AND CALENDAR-EVENTS FUNCTIONS
const useEvent = (): UseEventTypes => {
	const [eventsArray, setEventsArray] = useState<Event[]>(() => {
		const storedEvents = window.localStorage.getItem("calendarEvents");
		return storedEvents ? JSON.parse(storedEvents) : [];
	});

	const addEvent: AddEvent = useCallback((event) => {
		setEventsArray((prevEventsArray)=> [...prevEventsArray, event]);						
	}, []);
	
	const editEvent: EditEvent = useCallback((event) => {
		setEventsArray((prevEventsArray) =>
			prevEventsArray.map((e) => (e.id === event.id ? event : e))
		);				
	}, []);
	
	const deleteEvent: DeleteEvent = useCallback((event) => {
		setEventsArray((prevEventsArray)=> prevEventsArray.filter((e) => e.id !== event.id));		
	}, []);

	useEffect(() => {
		window.localStorage.setItem("calendarEvents", JSON.stringify(eventsArray));
	}, [eventsArray]);
	
	return { eventsArray, addEvent, editEvent, deleteEvent };
};

export default useEvent;
