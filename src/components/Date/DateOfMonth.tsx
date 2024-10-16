
import { SelectedDate } from "../Calendar/Calendar";
import EventListing from "../EventListing/EventListing";
import { Event } from "../../hooks/useEvent";
import { useEventContext } from "../../hooks/useEventContext";

type DateofMonthProps = {
	year: number;
	month: number;  
	date: number;
	dayClass?: string;
	setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
}


// COMPONENT TO CONTAIN DATE AND EVENT-LISININGS

const DateOfMonth: React.FC<DateofMonthProps> = ({ year, month, date, dayClass, setModalOpen, setSelectedDate }) => {
	const { eventsArray } = useEventContext();
	const dayOfWeek = new Date(year, month, date).getDay();	

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	// GET EVENTS OF THE DAY
	const daysEventsArray: Event[] = eventsArray.filter((event: Event) => {
		const eventDate = new Date(year, month, date).toLocaleDateString();	
	
		return (
			eventDate === event.date
		);
	})

	const handleAddEvent = (year: number, month: number, date: number) => {
		setModalOpen(true)
		setSelectedDate({ year, month, date })
	}

  return (
	<div className={`day ${dayClass}`}>
		    <div className="day-header">
              <div className="week-name">{days[dayOfWeek]}</div>
              <div className="day-number">{date}</div>
              <button className="add-event-btn" onClick={()=>handleAddEvent(year, month, date)}>+</button>
            </div>

			<div className="events">
				{daysEventsArray.map((event, index) => 
					<EventListing key={index} event={event} />	
				)}
			</div>
	</div>
  )
}

export default DateOfMonth;