import React, { createContext } from "react";
import useEvent, { Event } from "../../hooks/useEvent";


export const EventContext = createContext<Event[]>([]);

type EventProviderProps = {
	children: React.ReactNode;
};

const EventProvider = ({ children }: EventProviderProps) => {
	const [ eventsArray ] =  useEvent();	
	
	return (
	<EventContext.Provider value={eventsArray}>
		{children}
	</EventContext.Provider>
	)
};

export default EventProvider;
