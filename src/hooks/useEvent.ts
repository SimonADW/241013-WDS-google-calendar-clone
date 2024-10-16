import { useEffect, useState } from "react";

export type Event = {
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

const useEvent = (): [Event[], AddEvent, EditEvent, DeleteEvent] => {
	const [eventsArray, setEventsArray] = useState<Event[]>([]);

	// GET AN ARRAY OF EVENT ON SELECTED DAY (INCOMPLETE)
	// const getCurrentDaysEvents = (year: number, month: number, date: number) => {
	// 	const currentDay = new Date(year, month, date);
	// 	return eventsArray.filter((event) => {
	// 		const eventDate = new Date(event.date);
	// 		return (
	// 			eventDate.toDateString() === currentDay.toDateString()
	// 		);
	// 	});
	// };

	

	const addEvent: AddEvent = (event) => {
		setEventsArray([...eventsArray, event]);		
		console.log(eventsArray);
		
		// Code to add an event heres
	};
	
	const editEvent: EditEvent = (event) => {
		setEventsArray((prevEventsArray) =>
			prevEventsArray.map((e) => (e.id === event.id ? event : e))
	);		
		// Code to edit an event here
	};
	
	const deleteEvent: DeleteEvent = (event) => {
		setEventsArray(eventsArray.filter((e) => e.id !== event.id));
		// Code to delete an event here	
	};

	useEffect(() => {
	console.log(eventsArray);
	}, [eventsArray]);
	
	return [eventsArray, addEvent, editEvent, deleteEvent];
};

export default useEvent;
