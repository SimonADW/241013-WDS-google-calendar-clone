import { Event } from "../../hooks/useEvent";

type EventListingProps = {
	event: Event;
};

const EventListing = ({ event }: EventListingProps) => {
	return (
		<>
			{event.allDay ? (
				<button className={`all-day-event ${event.color} event`}>
					<div className="event-name">{event.name}</div>
				</button>
			) : (
				<button className="event">
					<div className={`color-dot ${event.color}`}></div>
					<div className="event-time">{`${event.startTime}`}</div>
					<div className="event-name">{event.name}</div>
				</button>
			)}
		</>
	);
};

export default EventListing;
