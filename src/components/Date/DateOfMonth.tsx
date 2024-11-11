import { SelectedDate } from "../Calendar/Calendar";
import EventListing from "../EventListing/EventListing";
import type { Event } from "../../hooks/useEvent";
import { useEventContext } from "../../hooks/useEventContext";
import { useCallback, useEffect, useRef, useState } from "react";
import MultipleEventsModal from "../MultipleEventsModal/MultipleEventsModal";

type DateofMonthProps = {
	year: number;
	month: number;
	date: number;
	dayClass?: string;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectedDate: SelectedDate;
	setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
	setIsEditing: React.Dispatch<React.SetStateAction<Event | null>>;
};

// GET EVENTS OF THE DAY ( Declared outside to be accessible in state declaration. "Hoisted outside")
function getAndSortEvents(
	eventsArray: Event[],
	year: number,
	month: number,
	date: number
) {
	const eventsOfTheDate: Event[] = eventsArray.filter((event: Event) => {
		const [eventDay, eventMonth, eventYear] = event.date
			.split("/")
			.map(Number);
		return (
			eventYear === year && eventMonth - 1 === month && eventDay === date
		);
	});

	const sortedEventsArray = eventsOfTheDate.sort(
		(a, b) =>
			Number(a.startTime.replace(":", "")) -
			Number(b.startTime.replace(":", ""))
	);

	return sortedEventsArray;
}

// COMPONENT TO CONTAIN DATE AND EVENT-LISININGS
const DateOfMonth: React.FC<DateofMonthProps> = ({
	year,
	month,
	date,
	dayClass,
	setModalOpen,
	selectedDate,
	setSelectedDate,
	setIsEditing,
}) => {
	const { eventsArray } = useEventContext();
	const [eventsToDisplay, setEventsToDisplay] = useState(
		getAndSortEvents(eventsArray, year, month, date)
	);
	const dateRef = useRef<HTMLDivElement | null>(null);
	const [eventsToFitDate, setEventsToFitDate] = useState<number>(
		getNumOfEventsToFitDate()
	);
	const [eventsOverflowed, setEventsOverFlowed] = useState(0);
	const [multipleEventsModalOpen, setMultipleEventsModalOpen] =
		useState(false);

	// GET BOOLEAN TO RENDER TODAY STYLE
	const getIfIsToday = useCallback(() => {
		const today = new Date();
		if (
			today.getFullYear() === year &&
			today.getMonth() === month &&
			today.getDate() === date
		) {
			return true;
		} else {
			return false;
		}
	}, [date, month, year]);
	const isToday = getIfIsToday();

	// CALCULATE EVENTS TO FIT IN DATE SQUARE
	function getNumOfEventsToFitDate(): number {
		let currentHeight;
		let eventsToFit = 0;
		if (dateRef.current) {
			currentHeight = dateRef.current.offsetHeight;
			const eventHeight = 24;
			eventsToFit = Math.floor(currentHeight / (eventHeight + 16));
		}
		return eventsToFit;
	}

	// UPDATE NUMBER OF EVENTS THAT FIT, ON RESIZE
	useEffect(() => {
		const getAndSetNumOfEventPrDate = () => {
			if (getNumOfEventsToFitDate() !== eventsToFitDate) {
				setEventsToFitDate(getNumOfEventsToFitDate());
			}
		};

		getAndSetNumOfEventPrDate();
		window.addEventListener("resize", getAndSetNumOfEventPrDate);

		return () =>
			window.removeEventListener("resize", getAndSetNumOfEventPrDate);
	}, [eventsToFitDate]);

	// LIMIT EVENTS TO DISPLAY TO AVOID OVERFLOW
	useEffect(() => {
		const limitEventsToDisplay = () => {
			let eventsOfTheDate = getAndSortEvents(
				eventsArray,
				year,
				month,
				date
			);
			if (eventsOfTheDate.length > eventsToFitDate) {
				setEventsOverFlowed(
					eventsOfTheDate.length - (eventsToFitDate + 1)
				);
				eventsOfTheDate = eventsOfTheDate.slice(0, eventsToFitDate);
			} else {
				setEventsOverFlowed(0);
			}
			setEventsToDisplay(eventsOfTheDate);
		};

		limitEventsToDisplay();
	}, [eventsArray, eventsToFitDate, month, year, date]);

	// HANDLERS
	const handleAddEvent = (year: number, month: number, date: number) => {
		setModalOpen(true);
		setSelectedDate({ year, month, date });
	};

	const handleViewMore = () => {
		setSelectedDate({ year, month, date });
		setMultipleEventsModalOpen(true);
	};

	return (
		<>
			<div ref={dateRef} className={`day ${dayClass}`}>
				<div className="day-header">					
					<div className={`day-number ${isToday ? "today" : ""}`}>
						{date}
					</div>
					<button
						className="add-event-btn"
						onClick={() => handleAddEvent(year, month, date)}
					>
						+
					</button>
				</div>

				<div className="events">
					{/* RENDER EVENTS ON DATE */}
					{eventsToDisplay.map((event, index) => (
						<EventListing
							key={index}
							event={event}
							setIsEditing={setIsEditing}
							setModalOpen={setModalOpen}
						/>
					))}
				</div>

				{/* DISPLAY "+ 1 more" WHEN DATE IS OVERFLOWED */}
				{eventsOverflowed ? (
					<button
						className="events-view-more-btn"
						onClick={() => handleViewMore()}
					>
						+ {eventsOverflowed} more
					</button>
				) : (
					""
				)}
			</div>

			{/* MODAL TO DISPLAY WHEN "+1 more" IS CLICKED (WHEN DATE IS OVERFLOWED) */}
			{multipleEventsModalOpen && (
				<MultipleEventsModal
					eventsOfTheDay={getAndSortEvents(
						eventsArray,
						year,
						month,
						date
					)}
					setModalOpen={setModalOpen}
					setMultipleEventsModalOpen={setMultipleEventsModalOpen}
					setIsEditing={setIsEditing}
					selectedDate={selectedDate}
				/>
			)}
		</>
	);
};

export default DateOfMonth;
