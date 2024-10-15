import React from 'react'


// COMPONENT TO CONTAIN DATE AND EVENT-LISININGS
type DateofMonthProps = {
  year: number;
  month: number;  
  date: number;
  dayClass?: string;
}

export const DateOfMonth: React.FC<DateofMonthProps> = ({ year, month, date, dayClass }) => {

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

  return (
	<div className={`day ${dayClass}`}>
		    <div className="day-header">
              <div className="week-name">{days[dayOfWeek]}</div>
              <div className="day-number">{date}</div>
              <button className="add-event-btn">+</button>
            </div>
	</div>
  )
}

export default Date