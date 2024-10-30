import React from "react";
import { Event } from "../../hooks/useEvent";
import EventListing from "../EventListing/EventListing";
import { SelectedDate } from "../Calendar/Calendar";

type MultipleEventsModalProps = {
	eventsOfTheDay: Event[];
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setMultipleEventsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditing: React.Dispatch<React.SetStateAction<Event | null>>;
	selectedDate: SelectedDate;
};

const MultipleEventsModal = ({
	eventsOfTheDay,
	setModalOpen,
	setMultipleEventsModalOpen,
	selectedDate,
	setIsEditing,
}: MultipleEventsModalProps) => {
	console.log(selectedDate);
	
	const { date, month, year } = selectedDate;
	
	return (
		<div className="modal">
			<div className="overlay"></div>
			<div className="modal-body">
				<div className="modal-title">
					{`${date}/${month}/${year}`}					
					<button
						className="close-btn"
						onClick={() => setMultipleEventsModalOpen(false)}
					>
						&times;
					</button>
				</div>
				<div className="events">
					{/* MAP OVER EVENTS AND RENDER */}
					{eventsOfTheDay.map((event, index) => (
						<EventListing
							key={index}
							event={event}
							setIsEditing={setIsEditing}
							setModalOpen={setModalOpen}
							setMultipleEventsModalOpen={setMultipleEventsModalOpen}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MultipleEventsModal;
