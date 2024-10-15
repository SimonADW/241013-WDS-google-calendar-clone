import { useState } from "react";
import DateOfMonth from "../Date/DateOfMonth";
import AddEventModal from "../AddEventModal/AddEventModal";

export type SelectedDate = { year: number; month: number; date: number };

// COMPONENT TO CONTAIN MONTH AND MONTH SELECTORS
const Calendar = () => {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

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
		}

		return [daysOfPrevMonth, daysOfMonth, daysOfNextMonth];
	};

	const [daysOfPrevMonth, daysOfMonth, daysOfNextMonth] =
		getArrayWithDaysToDisplay();

	return (
		<>
			<div className="header">
				<button className="btn">Today</button>
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

			<div className="days">
				{daysOfPrevMonth.map((date) => (
					<DateOfMonth
						key={date}
						year={year}
						month={month}
						date={date}
						dayClass="old-month-day"
						setModalOpen={setModalOpen}
						setSelectedDate={setSelectedDate}
					/>
				))}
				{daysOfMonth.map((date) => (
					<DateOfMonth
						key={date}
						year={year}
						month={month}
						date={date}
						setModalOpen={setModalOpen}
						setSelectedDate={setSelectedDate}
					/>
				))}
				{daysOfNextMonth.map((date) => (
					<DateOfMonth
						key={date}
						year={year}
						month={month}
						date={date}
						dayClass="non-month-day"
						setModalOpen={setModalOpen}
						setSelectedDate={setSelectedDate}
					/>
				))}
			</div>

			{modalOpen && (
				<AddEventModal
					setModalOpen={setModalOpen}
					selectedDate={selectedDate}
				/>
			)}
		</>
	);
};

export default Calendar;
