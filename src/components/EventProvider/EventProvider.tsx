import React, { createContext } from "react";
import useEvent, { Event } from "../../hooks/useEvent.ts";

type EventContextType = {
  eventsArray: Event[];
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
}


type EventProviderProps = {
	children: React.ReactNode;
};

export const EventContext = createContext<EventContextType | undefined>(undefined);

const EventProvider = ({ children }: EventProviderProps) => {
	const [ eventsArray, addEvent, editEvent, deleteEvent ] =  useEvent();	
	
	return (
	<EventContext.Provider value={{eventsArray, addEvent, editEvent, deleteEvent }}>
		{children}
	</EventContext.Provider>
	)
};

export default EventProvider;
