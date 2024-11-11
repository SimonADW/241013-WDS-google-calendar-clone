import { useState } from "react";
import type { Event } from "../../hooks/useEvent";
import DateOfMonth from "../Date/DateOfMonth";
import AddEventModal from "../AddEventModal/AddEventModal";

export type SelectedDate = { year: number; month: number; date: number };

// COMPONENT TO CONTAIN MONTH AND MONTH SELECTORS
const Calendar = () => {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [modalOpen, setModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState<Event | null>(null);
	const [selectedDate, setSelectedDate] = useState<SelectedDate>({month, year, date: 1});

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	
	// FUNCTION TO HANDLE MONTH CHANGE BUTTONS
	const handleMonthChange = (direction: number) => {
		if (month === 0 && direction === -1) {
			setMonth(11);
			setYear((prevYear) => prevYear - 1);
			return;
		} else if (month === 11 && direction === 1) {
			setMonth(0);
			setYear((prevYear) => prevYear + 1);
			return;
		}
		setMonth((prevMonth) => prevMonth + direction);
	};

	// FUNCTION TO GET ARRAY WITH DAYS MAP OVER IN JSX
	const getArrayWithDaysToDisplay = () => {
		const lastDayOfPrevMonth = new Date(year, month, 0).getDay();
		const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
		const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();

		// DAYS OF THE PREVIOUS MONTH
		const daysOfPrevMonth = [];
		let lastDateOfPrevMonth = new Date(year, month, 0).getDate();
		for (let i = lastDayOfPrevMonth; i > 0; i--) {
			daysOfPrevMonth.push(lastDateOfPrevMonth);
			// START WEEK FROM SUNDAY
			daysOfPrevMonth.reverse();
			lastDateOfPrevMonth--;
		}

		// DAYS OF THE MONTH
		const daysOfMonth = Array.from(
			{ length: lastDateOfMonth },
			(_, i) => i + 1
		);

		// DAYS OF THE NEXT MONTH
		const daysOfNextMonth = [];
		for (let i = 1; i <= 7 - lastDayOfMonth; i++) {
			daysOfNextMonth.push(i);
			// START WEEK FROM SUNDAY
			daysOfNextMonth.reverse();
		}

		return [daysOfPrevMonth, daysOfMonth, daysOfNextMonth];
	};

	const [daysOfPrevMonth, daysOfMonth, daysOfNextMonth] = getArrayWithDaysToDisplay();

	const handleTodayClick = ()=> {
		setMonth(new Date().getMonth());
		setYear(new Date().getFullYear());
	}

	return (
		<>
			<div className="header">
				<button className="btn" onClick={handleTodayClick}>Today</button>
				<div>
					<button
						className="month-change-btn"
						onClick={() => handleMonthChange(-1)}
					>
						&lt;
					</button>
					<button
						className="month-change-btn"
						onClick={() => handleMonthChange(1)}
					>
						&gt;
					</button>
				</div>
				<span className="month-title">{`${months[month]} ${year}`}</span>
			</div>

				<div className="weekname-row">
					<div className="week-name">Monday</div>			
					<div className="week-name">Tuesday</div>
					<div className="week-name">Wednesday</div>
					<div className="week-name">Thursday</div>
					<div className="week-name">Friday</div>
					<div className="week-name">Saturday</div>
					<div className="week-name">Sunday</div>
				</div>
			<div className="days">	
				{daysOfPrevMonth.map((date) => (					
					<DateOfMonth
						key={date}
						year={month === 0 ? year - 1 : year} // previous year if January
						month={month === 0 ? 11 : month - 1} // December if January
						date={date}
						dayClass="old-month-day"
						setModalOpen={setModalOpen}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						setIsEditing={setIsEditing}						
					/>
				))}
				{daysOfMonth.map((date) => (
					<DateOfMonth
						key={date}
						year={year}
						month={month}
						date={date}
						dayClass=""
						setModalOpen={setModalOpen}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						setIsEditing={setIsEditing}
					/>
				))}
				{daysOfNextMonth.map((date) => (
					<DateOfMonth
						key={date}
						year={(month > 11 ) ? year +1: year} // Next year if December
						month={month === 11 ? 0 : month + 1} // Jan if December
						date={date}
						dayClass="non-month-day"
						setModalOpen={setModalOpen}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						setIsEditing={setIsEditing}
					/>
				))}
			</div>

			{modalOpen && (
				<AddEventModal
					setModalOpen={setModalOpen}
					selectedDate={selectedDate}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			)}
		</>
	);
};

export default Calendar;
