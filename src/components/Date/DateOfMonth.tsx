import { SelectedDate } from "../Calendar/Calendar";
import EventListing from "../EventListing/EventListing";
import type { Event } from "../../hooks/useEvent";
import { useEventContext } from "../../hooks/useEventContext";
import { useCallback } from "react";

type DateofMonthProps = {
	year: number;
	month: number;  
	date: number;
	dayClass?: string;
	setModalOpen:  React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
	setIsEditing: React.Dispatch<React.SetStateAction<Event | null>>;
}


// COMPONENT TO CONTAIN DATE AND EVENT-LISININGS
const DateOfMonth: React.FC<DateofMonthProps> = ({ year, month, date, dayClass, setModalOpen, setSelectedDate, setIsEditing }) => {
	const { eventsArray } = useEventContext();
	
	// GET BOOLEAN TO RENDER TODAY STYLE
	const getIfIsToday = useCallback(()=> {
		const today = new Date()
		if(today.getFullYear() === year && today.getMonth() === month && today.getDate() === date) {
			return true;
		} else {
			return false;
		};
	}, [date, month, year]);

	const isToday = getIfIsToday();

	// GET THE DAY OF THE WEEK 
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
	const getAndSortEvents = (eventsArray: Event[]) => {
		const eventsOfTheDate: Event[] = eventsArray.filter((event: Event) => {
			const eventDate = new Date(year, month, date).toLocaleDateString();		
			return (
				eventDate === event.date
			);
		});

		const sortedEventsArray = eventsOfTheDate.sort((a, b)=> 			
			Number(a.startTime.replace(":","")) - Number(b.startTime.replace(":",""))
		)
		return sortedEventsArray
	}

	const eventsOfTheDate = getAndSortEvents(eventsArray);

	const handleAddEvent = (year: number, month: number, date: number) => {
		setModalOpen(true)
		setSelectedDate({ year, month, date })
	}

  return (
	<div className={`day ${dayClass}`}>
		    <div className="day-header">
              <div className="week-name">{days[dayOfWeek]}</div>
              <div className={`day-number ${isToday && "today"}`}>{date}</div>
              <button className="add-event-btn" onClick={()=>handleAddEvent(year, month, date)}>+</button>
            </div>

			<div className="events">
				{eventsOfTheDate.map((event, index) => 
					<EventListing key={index} event={event} setIsEditing={setIsEditing} setModalOpen={setModalOpen}/>	
				)}
			</div>
	</div>
  )
}

export default DateOfMonth;