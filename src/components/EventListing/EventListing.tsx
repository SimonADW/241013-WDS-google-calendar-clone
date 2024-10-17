import { Event } from "../../hooks/useEvent";

type EventListingProps = {
	event: Event;
	setIsEditing: React.Dispatch<React.SetStateAction<Event | null>>
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const EventListing = ({ event, setIsEditing, setModalOpen }: EventListingProps) => {
	
	const handleOpenEvent = (event: Event) => {
		setModalOpen(true);
		setIsEditing(event);		
	}

	return (
		<>
			{event.allDay ? (
				<button onClick={()=> handleOpenEvent(event)} className={`all-day-event ${event.color} event`}>
					<div className="event-name">{event.name}</div>
				</button>
			) : (
				<button onClick={()=> handleOpenEvent(event)} className="event">
					<div className={`color-dot ${event.color}`}></div>
					<div className="event-time">{`${event.startTime}`}</div>
					<div className="event-name">{event.name}</div>
				</button>
			)}
		</>
	);
};

export default EventListing;
